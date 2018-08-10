const sscsCaseListTemplate = require('./templates/caseList/sscs.template.json');
const generateRequest = require('../lib/request');
const config = require('../../config');
const valueProcessor = require('../lib/processors/value-processor');
const getListTemplate = require('./templates/caseList');

function getCases(userId, options, caseType = 'Benefit', caseStateId = 'appealCreated', jurisdiction = 'SSCS', benefitType = 'case.appeal.benefitType.code=PIP&') {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC`, options)
}

function getCases(userId, jurisdictions, options) {
    const promiseArray = [];
    jurisdictions.forEach(jurisdiction => {
        promiseArray.push(generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}/cases?sortDirection=DESC`, options))
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
                        let caseStateMap = new Map(hearings.online_hearings
                            .map(hearing => [Number(hearing.case_id), hearing.current_state]));
                        casesData.forEach(caseRow => {
                            let state = caseStateMap.get(Number(caseRow.id));
                            if (state !== undefined && state !== null && state.state_name !== undefined && state.state_name !== null) {
                                caseRow.status = format(state.state_name);
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


//List of cases
module.exports = (req, res, next) => {
    const token = req.auth.token;
    const userId = req.auth.userId;
    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    };

    //As requested by Chelsea - The below is hardcoded. In future this should not be hardcoded but driven by the user.
    const jurisdictions = [{
        jur: 'DIVORCE',
        caseType: 'DIVORCE'
    }, {
        jur: 'SSCS',
        caseType: 'Benefit'
    }];

    getCases(userId, jurisdictions, options)
        .then(caseLists => Promise.all(caseLists.map(caseList => processCaseList(caseList, options))))
        .then(combineLists)
        .then(results => {
            results.sort(function (result1, result2) {
                return new Date(result1.case_fields.dateOfLastAction) - new Date(result2.case_fields.dateOfLastAction);
            });
            const aggregatedData = {...sscsCaseListTemplate, results: results};
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('content-type', 'application/json');
            res.status(200).send(JSON.stringify(aggregatedData));
        }).catch(response => {
        console.log(response.error || response);
        res.status(response.statusCode || 500).send(response);
    });
};
