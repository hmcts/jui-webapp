const express = require('express');
const config = require('../../../config');
const getListTemplate = require('./templates');
const generateRequest = require('../../lib/request');
const valueProcessor = require('../../lib/processors/value-processor');
const sscsCaseListTemplate = require('./templates/sscs/benefit');
const mockRequest = require('../../lib/mockRequest');
const { getAllQuestionsByCase } = require('../../questions');
const moment = require('moment');
const processCaseStateEngine = require('../../lib/processors/case-state-model');
const { caseStateFilter } = require('../../lib/processors/case-state-util');

const jurisdictions = [
    {
        jur: 'DIVORCE',
        caseType: 'DIVORCE',
        filter: ''
    },
    {
        jur: 'SSCS',
        caseType: 'Benefit',
        filter: '&state=appealCreated&case.appeal.benefitType.code=PIP'
    },
    {
        jur: 'DIVORCE',
        caseType: 'FinancialRemedyMVP2',
        filter: ''
    },
    // {
    //     jur: 'CMC',
    //     caseType: 'MoneyClaimCase',
    //     filter: ''
    // },
    // {
    //     jur: 'PROBATE',
    //     caseType: 'GrantOfRepresentation',
    //     filter: ''
    // }
];

function getOptions(req) {
    return {
        headers: {
            'Authorization': `Bearer ${req.auth.token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    };
}

function getCases(userId, jurisdictions, options) {
    const promiseArray = [];
    jurisdictions.forEach(jurisdiction => {
        if (process.env.JUI_ENV === 'mock') {
            promiseArray.push(mockRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}/cases?sortDirection=DESC${jurisdiction.filter}`, options))
        } else {
            promiseArray.push(generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}/cases?sortDirection=DESC${jurisdiction.filter}`, options))
        }
    });
    return Promise.all(promiseArray);
}

function getOnlineHearing(caseIds, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/?${caseIds}`, options);
}

function rawCasesReducer(cases, columns) {
    return cases.map(caseRow => {
        return {
            case_id: caseRow.id,
            case_jurisdiction: caseRow.jurisdiction,
            case_type_id: caseRow.case_type_id,
            case_fields: columns.reduce((row, column) => {
                row[column.case_field_id] = valueProcessor(column.value, caseRow);
                return row;
            }, {})
        };
    });
}

function hasCOR(caseData) {
    return caseData.jurisdiction === 'SSCS';
}

function stateDatetimeDiff(a, b) {
    const dateTime1 = moment.utc(a.state_datetime);
    const dateTime2 = moment.utc(b.state_datetime);

    return moment.duration(moment(dateTime2).diff(moment(dateTime1))).asMilliseconds();
}

function latestQuestionRounds(questionsRounds) {
    return (questionsRounds) ? questionsRounds.sort((a, b) => (a.question_round_number < b.question_round_number))[0] : [];
}

function getHearingWithQuestionData(hearing, userId, options) {
    return getAllQuestionsByCase(hearing.case_id, userId, options)
        .then(latestQuestionRounds)
        .then(questionRound => {
            if(questionRound) {
                questionRound.questions.sort((a, b) => stateDatetimeDiff(a, b))
            }
            return {
                hearing: hearing,
                latest_question_round: questionRound
            }
        });
}

function getCOR(casesData, options) {
    let caseIds = casesData.map(caseRow => 'case_id=' + caseRow.id).join("&");
    return new Promise(resolve => {
        if (hasCOR(casesData[0])) {
            getOnlineHearing(caseIds, options)
                .then(hearings => {
                    if (hearings.online_hearings) {
                        let caseStateMap = new Map(hearings.online_hearings.map(hearing => [Number(hearing.case_id), hearing]));
                        casesData.forEach(caseRow => {caseRow.hearing_data = caseStateMap.get(Number(caseRow.id));});
                    }
                    resolve(casesData);
                });
        }
        else {
            resolve(casesData);
        }
    });
}

function appendCOR(caseLists, options) {
    return Promise.all(caseLists.map(caseList => {
        return new Promise((resolve, reject) => {
            if (caseList && caseList.length) {
                getCOR(caseList, options).then(casesDataWithCor => {
                    resolve(casesDataWithCor);
                })

            } else {
                resolve([]);
            }
        })
    }));
}

function hearingsWithQuestionData(caseLists, userId, options) {
    const promiseArray = [];
        caseLists.forEach(caseRow => {
            if(caseRow.hearing_data) {
                promiseArray.push(getHearingWithQuestionData(caseRow.hearing_data, userId, options))
            }
        });
    return Promise.all(promiseArray);
}

function appendQuestionsRound(caseLists, userId, options) {
    return Promise.all(caseLists.map(caseList => {
        return new Promise((resolve, reject) => {
            if (caseList && caseList.length) {
                hearingsWithQuestionData(caseList, userId, options).then(hearingsWithQuestionData => {
                    if(hearingsWithQuestionData){
                        let caseStateMap = new Map(hearingsWithQuestionData.map(hearing_data => [Number(hearing_data.hearing.case_id), hearing_data]));
                        caseList.forEach(caseRow => caseRow.hearing_data = caseStateMap.get(Number(caseRow.id)));
                    }
                    resolve(caseList);
                })
            } else {
                resolve([]);
            }
        })
    }));
}

function processState(caseLists) {
    return caseLists.map(
        caselist => {
            caselist.map(caseRow => {
                const jurisdiction = caseRow.jurisdiction;
                const caseType = caseRow.case_type_id;
                const ccdState = caseRow.state;
                const hearingData = caseRow.hearing_data ? caseRow.hearing_data.hearing : undefined;
                const questionRoundData = hearingData ? caseRow.hearing_data.latest_question_round : undefined;

                const caseState = processCaseStateEngine({
                    jurisdiction,
                    caseType,
                    ccdState,
                    hearingData,
                    questionRoundData
                });

                caseRow.state = caseState.stateName;
                if(caseState.stateDateTime) {
                    if (new Date(caseRow.last_modified) < new Date(caseState.stateDateTime)) {
                        caseRow.last_modified = caseState.stateDateTime;
                    }
                }

                return caseRow;
            });
            return caselist
        });
}

function applyStateFilter(caseLists) {
    return caseLists.map(
        caseList => {
                return caseList.filter(caseStateFilter);
    });
}

function convertCaselistToTemplate(caseLists) {
    return caseLists.map(
        caselist => {
            if(caselist && caselist.length) {
                const jurisdiction = caselist[0].jurisdiction;
                const caseType = caselist[0].case_type_id;
                const template = getListTemplate(jurisdiction, caseType);
                return results = rawCasesReducer(caselist, template.columns)
                    .filter(row => !!row.case_fields.case_ref);
            }
            return caselist;
        });
}

function combineLists(lists) {
    return [].concat(...lists);
}

function sortByLastModified(results) {
    return results.sort((result1, result2) => new Date(result1.case_fields.lastModified) - new Date(result2.case_fields.lastModified));
}

module.exports = app => {
    const router = express.Router({mergeParams: true});

    router.get('/', (req, res, next) => {
        const userId = req.auth.userId;
        const options = getOptions(req);

        getCases(userId, jurisdictions, options)
            .then(caseLists => appendCOR(caseLists, options))
            .then(caseLists => appendQuestionsRound(caseLists, userId, options))
            .then(processState)
            .then(applyStateFilter)
            .then(convertCaselistToTemplate)
            .then(combineLists)
            .then(sortByLastModified)
            .then(results => {
                const aggregatedData = {...sscsCaseListTemplate, results};
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(aggregatedData));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.statusCode || 500)
                    .send(response);
            });
    });

    router.get('/raw', (req, res, next) => {
        const userId = req.auth.userId;
        const options = getOptions(req);

        getCases(userId, jurisdictions, options)
            .then(combineLists)
            .then(results => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(results));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.statusCode || 500)
                    .send(response);
            });
    });


    router.get('/raw/coh', (req, res, next) => {
        const userId = req.auth.userId;
        const options = getOptions(req);

        getCases(userId, jurisdictions, options)
            .then(caseLists => appendCOR(caseLists, userId, options, jurisdictions))
            .then(combineLists)
            .then(results => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(results));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.statusCode || 500)
                    .send(response);
            });
    });

    app.use('/cases', router);
};
