const express = require('express');
const config = require('../../../config');
const getListTemplate = require('./templates');
const generateRequest = require('../../lib/request');
const valueProcessor = require('../../lib/processors/value-processor');
const sscsCaseListTemplate = require('./templates/sscs/benefit');
const mockRequest = require('../../lib/mockRequest');

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

function format(state) {
    let formattedState = state.split("_").join(" ");
    return formattedState[0].toUpperCase() + formattedState.slice(1);
}


function hasCOR(caseData) {
    return caseData.jurisdiction === 'SSCS';
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
                getCOR(caseList, options).then(casesDataWithCor => resolve(casesDataWithCor));
            } else {
                resolve([]);
            }
        })
    }));
}

function processCOR(caseLists) {
    return caseLists.map(
        caselist => {
            caselist.map(caseRow => {
                let hearingData = caseRow.hearing_data;
                let state = (hearingData) ? hearingData.current_state : undefined;
                if (state !== undefined && state !== null && state.state_name !== undefined && state.state_name !== null) {
                    caseRow.state = format(state.state_name);
                    if (new Date(caseRow.last_modified) < new Date(state.state_datetime)) {
                        caseRow.last_modified = state.state_datetime;
                    }
                }
                return caseRow;
            });
            return caselist
        });
}

function processEngine(param) {
    return 'a future state';
}

function processState(caseLists) {
    return caseLists.map(
        caselist => {
            caselist.map(caseRow => {
                const jurisdiction = caseRow.jurisdiction;
                const caseType = caseRow.case_type_id;
                const ccdState = caseRow.state;
                const hearingData = caseRow.hearing_data;
                const hearingState = (hearingData) ? hearingData.current_state : undefined;

                // TODO: Added State Process Engine here
                // caseRow.state = processEngine({
                //     jurisdiction,
                //     caseType,
                //     ccdState,
                //     hearingState
                // });

                return caseRow;
            });
            return caselist
        });
}

function convertCaselistToTemplate(caseLists) {
    return caseLists.map(
        caselist => {
            const jurisdiction = caselist[0].jurisdiction;
            const caseType = caselist[0].case_type_id;
            const template = getListTemplate(jurisdiction, caseType);
            return results = rawCasesReducer(caselist, template.columns)
                .filter(row => !!row.case_fields.case_ref);
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
            .then(caseLists => appendCOR(caseLists,options))
            .then(processCOR)
            .then(processState)
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
            .then(caseLists => appendCOR(caseLists,options))
            .then(processCOR)
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
