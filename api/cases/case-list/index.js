const express = require('express');
const config = require('../../../config');
const getListTemplate = require('./templates');
const generateRequest = require('../../lib/request');
const valueProcessor = require('../../lib/processors/value-processor');
const sscsCaseListTemplate = require('./templates/sscs/benefit');
const { getCCDCases } = require('../../services/ccd-store-api/ccd-store');

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

function getParams(req) {
    return {
        headers: {
            'Authorization': `Bearer ${req.auth.token}`
        }
    };
}

function getCases(userId, jurisdictions, options) {
    const promiseArray = [];
    if (process.env.JUI_ENV === 'mock') {
        jurisdictions.forEach(jurisdiction => {
            promiseArray.push(mockRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}/cases?sortDirection=DESC${jurisdiction.filter}`, options))
        });
    } else {
        jurisdictions.forEach(jurisdiction => {
            promiseArray.push(generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}/cases?sortDirection=DESC${jurisdiction.filter}`, options))
        });
    }
    return Promise.all(promiseArray);
}

function getOnlineHearing(caseIds, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/?${caseIds}`, options);
}

function getUserDetails(options) {
    return Promise.resolve(generateRequest('GET', `${config.services.idam_api}/details`, options));
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
                        let caseStateMap = new Map(hearings.online_hearings
                            .map(hearing => [Number(hearing.case_id), hearing.current_state]));
                        casesData.forEach(caseRow => {
                            let state = caseStateMap.get(Number(caseRow.id));
                            if (state !== undefined && state !== null && state.state_name !== undefined && state.state_name !== null) {
                                // TODO: this state should only change if CCD is the COH state else default to CCD state
                                caseRow.state = format(state.state_name);
                                if (new Date(caseRow.last_modified) < new Date(state.state_datetime)) {
                                    caseRow.last_modified = state.state_datetime;
                                }
                            }
                        });
                    }
                    resolve(casesData);
                });
        }
        else {
            resolve(casesData);
        }
    });
}

function processCaseList(caseList, options) {
    return new Promise((resolve, reject) => {
        if (caseList && caseList.length) {
            getCOR(caseList, options).then(casesData => {
                const jurisdiction = casesData[0].jurisdiction;
                const caseType = casesData[0].case_type_id;
                const template = getListTemplate(jurisdiction, caseType);
                const results = rawCasesReducer(casesData, template.columns)
                    .filter(row => !!row.case_fields.case_ref);

                resolve(results)
            });
        }
        else {
            resolve([]);
        }
    });
}

function combineLists(lists) {
    return [].concat(...lists);
}

function sortCases(results) {
    return results.sort((result1, result2) => new Date(result1.case_fields.lastModified) - new Date(result2.case_fields.lastModified));
}

function processLists(caseLists, options) {
    return Promise.all(caseLists.map(caseList => processCaseList(caseList, options)))
}

function aggregatedData(results) {
    return {...sscsCaseListTemplate, results};
}

function filterCases(caseList, options) {
    return getUserDetails(options)
        .then(details => caseList.filter(case1 => case1.assignedToJudge === details.email));
}

module.exports = app => {
    const router = express.Router({mergeParams: true});

    router.get('/', (req, res, next) => {
        const userId = req.auth.userId;
        const options = getOptions(req);
        const params = getParams(req);

        getCCDCases(userId, jurisdictions, options)
            .then(caseLists => processLists(caseLists, options))
            .then(combineLists)
            .then(caseList => filterCases(caseList, params))
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

    router.get('/raw', (req, res, next) => {
        const userId = req.auth.userId;
        const options = getOptions(req);

        getCCDCases(userId, jurisdictions, options)
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
