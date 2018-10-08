const express = require('express');
const moment = require('moment');
const getListTemplate = require('./templates');
const sscsCaseListTemplate = require('./templates/sscs/benefit');
const processCaseStateEngine = require('../../lib/processors/case-state-model');
const { caseStateFilter } = require('../../lib/processors/case-state-util');
const valueProcessor = require('../../lib/processors/value-processor');
const generateRequest = require('../../lib/request');
const { getAllQuestionsByCase } = require('../../questions/question');
const { getMutiJudCCDCases, getCCDCases, getCCDEventToken , postCCDEvent } = require('../../services/ccd-store-api/ccd-store');
const config = require('../../../config');
const jurisdictions = [
    {
        jur: 'DIVORCE',
        caseType: 'DIVORCE',
        role: 'DIVORCE',
        filter: '',
        label: 'Divorce'
    },
    {
        jur: 'SSCS',
        caseType: 'Benefit',
        role: 'SSCS',
        filter: '&state=appealCreated&case.appeal.benefitType.code=PIP',
        label: 'SSCS'
    },
    {
        jur: 'DIVORCE',
        caseType: 'FinancialRemedyMVP2',
        role: 'FinancialRemedy',
        filter: '',
        label: 'Financial remedy'
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

function getUserDetails(options) {
    return generateRequest('GET', `${config.services.idam_api}/details`, options);
}

function hasCOR(caseData) {
    return caseData.jurisdiction === 'SSCS';
}

// TODO put this is the coh-cor microserver module
function getOnlineHearing(caseIds, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/?${caseIds}`, options);
}

function getCOR(casesData, options) {
    const caseIds = casesData.map(caseRow => `case_id=${caseRow.id}`).join('&');
    return new Promise(resolve => {
        if (hasCOR(casesData[0])) {
            getOnlineHearing(caseIds, options)
                .then(hearings => {
                    if (hearings.online_hearings) {
                        const caseStateMap = new Map(hearings.online_hearings.map(hearing => [Number(hearing.case_id), hearing]));
                        casesData.forEach(caseRow => {
                            caseRow.hearing_data = caseStateMap.get(Number(caseRow.id));
                        });
                    }
                    resolve(casesData);
                });
        } else {
            resolve(casesData);
        }
    });
}

function appendCOR(caseLists, options) {
    return Promise.all(caseLists.map(caseList => new Promise((resolve, reject) => {
        if (caseList && caseList.length) {
            getCOR(caseList, options).then(casesDataWithCor => {
                resolve(casesDataWithCor);
            });
        } else {
            resolve([]);
        }
    })));
}

function latestQuestionRounds(questionsRounds) {
    return (questionsRounds) ? questionsRounds.sort((a, b) => (a.question_round_number < b.question_round_number))[0] : [];
}

function stateDatetimeDiff(a, b) {
    const dateTime1 = moment.utc(a.state_datetime);
    const dateTime2 = moment.utc(b.state_datetime);

    return moment.duration(moment(dateTime2).diff(moment(dateTime1))).asMilliseconds();
}

function getHearingWithQuestionData(hearing, userId, options) {
    return getAllQuestionsByCase(hearing.case_id, userId, options)
        .then(latestQuestionRounds)
        .then(questionRound => {
            if (questionRound) {
                questionRound.questions.sort((a, b) => stateDatetimeDiff(a, b));
            }
            return {
                hearing,
                latest_question_round: questionRound
            };
        });
}

function hearingsWithQuestionData(caseLists, userId, options) {
    const promiseArray = [];
    caseLists.forEach(caseRow => {
        if (caseRow.hearing_data) {
            promiseArray.push(getHearingWithQuestionData(caseRow.hearing_data, userId, options));
        }
    });
    return Promise.all(promiseArray);
}

function appendQuestionsRound(caseLists, userId, options) {
    return Promise.all(caseLists.map(caseList => new Promise((resolve, reject) => {
        if (caseList && caseList.length) {
            hearingsWithQuestionData(caseList, userId, options).then(hearingsWithQuestionData => {
                if (hearingsWithQuestionData) {
                    const caseStateMap = new Map(hearingsWithQuestionData.map(hearing_data => [Number(hearing_data.hearing.case_id), hearing_data]));
                    caseList.forEach(caseRow => caseRow.hearing_data = caseStateMap.get(Number(caseRow.id)));
                }
                resolve(caseList);
            });
        } else {
            resolve([]);
        }
    })));
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
                if (caseState.stateDateTime) {
                    if (new Date(caseRow.last_modified) < new Date(caseState.stateDateTime)) {
                        caseRow.last_modified = caseState.stateDateTime;
                    }
                }

                return caseRow;
            });
            return caselist;
        });
}

function applyStateFilter(caseLists) {
    return caseLists.map(caseList => caseList.filter(caseStateFilter));
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
            }, {}),
            assignedToJudge : caseRow.case_data.assignedToJudge
        };
    });
}

function convertCaselistToTemplate(caseLists) {
    return caseLists.map(
        caselist => {
            if (caselist && caselist.length) {
                const jurisdiction = caselist[0].jurisdiction;
                const caseType = caselist[0].case_type_id;
                const template = getListTemplate(jurisdiction, caseType);
                return results = rawCasesReducer(caselist, template.columns)
                    .filter(row => Boolean(row.case_fields.case_ref));
            }
            return caselist;
        });
}

function combineLists(lists) {
    return [].concat(...lists);
}

function sortCases(results) {
    return results.sort((result1, result2) => new Date(result1.case_fields.lastModified) - new Date(result2.case_fields.lastModified));
}

function sortCasesByLastModifiedDate(results) {
    return results.sort((result1, result2) => new Date(result1.lastModified) - new Date(result2.lastModified));

}

function aggregatedData(results) {
    return {...sscsCaseListTemplate, results};
}

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    };
}

function getParams(req) {
    return {
        headers: {
            'Authorization': `Bearer ${req.auth.token}`
        }
    };
}

function getJurisdictionDetails(jurisdictionList, jurCaseType) {
    console.log('getJurisdictionDetails', jurisdictions, jurCaseType);
    let arrJurCaseType = jurCaseType.split('-');
    let jur = arrJurCaseType[0];
    let caseType = arrJurCaseType[1];
    return jurisdictionList.filter(jurisdiction1 => jurisdiction1.jur.toLowerCase() === jur.toLowerCase()
        && jurisdiction1.role.toLowerCase() === caseType.toLowerCase());
}

function getMatchingJurisdictions(details, jurisdictions) {
    let rolesAsJudge = details.roles.filter(role => role.toLowerCase().includes('judge'));
    if (rolesAsJudge !== undefined && rolesAsJudge.length > 0) {
        let jurisdictionList = rolesAsJudge.map(role => role.split('_')[0] + '-' + role.split('_')[1]);
        return jurisdictionList.map(jurCaseType => getJurisdictionDetails(jurisdictions, jurCaseType));
    }
    return [];
}

function filterAssignedCases(cases) {
    return cases[0].filter(row => !row.case_data.assignedToJudge);
}

function assignToJudge(userId, awaitingJuiRespCases, options) {
    let newCase = awaitingJuiRespCases[0];
    let jurisdiction = awaitingJuiRespCases[0].jur;
    let caseType = awaitingJuiRespCases[0].case_type_id;
    let caseId = awaitingJuiRespCases[0].id;

    Promise.all([
        getUserDetails(options),
        getCCDEventToken(userId, newCase.jurisdiction,  newCase.case_type_id,
            newCase.id, 'FR_amendCase', options)
    ]).then(([details, eventToken]) => {
        eventToken.case_details.case_data.assignedToJudge = details.email;
        return eventToken;
    }).then(eventToken => {
        options.body = {
            data: eventToken.case_details.case_data,
            event: {
                description: 'Assign judge',
                id: 'FR_amendCase',
                summary: 'Assign judge'
            },
            event_token: eventToken.token,
            ignore_warning: true
        };
        return postCCDEvent(userId, jurisdiction, caseType, caseId, options);

    }). catch(err => {
        console.log("error >>" , err);
    });
}



function getNewCase(userId, selectedJurisdiction, options, caseLists) {
    // Step 1:  Get all cases for a selected jurisdiction and caseType
    // and filter them by  state=Awaiting Judicial Response
    // userId, jurisdiction, caseType, filter, options
    if(selectedJurisdiction.length > 0) {
        let promiseArr = [];
        promiseArr.push(getCCDCases(userId, selectedJurisdiction[0].jur, selectedJurisdiction[0].caseType,
            selectedJurisdiction[0].filter + '&state=referredToJudge', options));
        return Promise.all(promiseArr)
            .then(cases => filterAssignedCases(cases))
            .then(cases => sortCasesByLastModifiedDate(cases))
            .then(awaitingJuiRespCases => assignToJudge(userId, awaitingJuiRespCases, options))
            .then(() => getMutiJudCCDCases(userId, jurisdictions, options))
            .catch(err => {
            console.log("get new case Err", err);
        });

    }
    return caseLists;
}

function filterCases(caseList, options) {
    return getUserDetails(options)
        .then(details => caseList.filter(case1 => case1.assignedToJudge === details.email));
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });

    router.get('/', (req, res, next) => {
        const userId = req.auth.userId;
        const options = getOptions(req);
        const selectedJur = req.query.jurisdiction;
        const selectedCaseType = req.query.caseType;
        const params = getParams(req);
        const selectedJurisdiction = jurisdictions.filter(entry => entry.jur === selectedJur && entry.caseType === selectedCaseType);

        ((selectedJurisdiction && selectedJurisdiction.length > 0) ?
            getNewCase(userId, selectedJurisdiction, options) :
            getMutiJudCCDCases(userId, jurisdictions, options))
            .then(caseLists => getNewCase(userId, selectedJurisdiction, options, caseLists))
            .then(caseLists => appendCOR(caseLists, options))
            .then(caseLists => appendQuestionsRound(caseLists, userId, options))
            .then(processState)
            .then(applyStateFilter)
            .then(convertCaselistToTemplate)
            .then(combineLists)
           // .then(caseList => filterCases(caseList, params))
            .then(sortCases)
            .then(aggregatedData)
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
    router.get('/jurisdictions', (req, res, next) => {
        getUserDetails(getParams(req))
            .then(details => getMatchingJurisdictions(details, jurisdictions))
            .then(combineLists)
            .then(jurisdictionList => {
                console.log("roles   ..........", jurisdictionList);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                console.log("JSON.stringify(jurisdictions)", JSON.stringify(jurisdictionList));
                res.status(200).send(JSON.stringify(jurisdictionList));
            });
    });

    router.get('/raw', (req, res, next) => {
        const userId = req.auth.userId;
        const options = getOptions(req);

        getMutiJudCCDCases(userId, jurisdictions, options)
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

        getMutiJudCCDCases(userId, jurisdictions, options)
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
