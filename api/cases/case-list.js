const sscsCaseListTemplate = require('./sscsCaseList.template');
const frCaseListTemplate = require('./frCaseList.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const valueProcessor = require('../lib/processors/value-processor');

function getSSCSCases(userId, options, caseType = 'Benefit', caseStateId = 'appealCreated', jurisdiction = 'SSCS', benefitType = 'case.appeal.benefitType.code=PIP&') {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?${benefitType}state=${caseStateId}&sortDirection=DESC`, options)
}


function getFrCases(userId, options, caseType = 'FinancialRemedyMVP2', caseStateId = 'caseAdded', jurisdiction = 'DIVORCE') {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?state=${caseStateId}&sortDirection=DESC`, options)
}

function  getCases(userId, options) {
    return Promise.all([
        getSSCSCases(userId, options),
        getFrCases(userId, options)]
    )
}

function getOnlineHearing(caseIds, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/?${caseIds}`, options);
}

function rawCasesReducer(cases, columns, caseNumberLabel) {
    return cases.map(caseRow => {
                return {
                    case_id: caseRow.id,
                    case_reference: valueProcessor(caseNumberLabel, caseRow),
                    case_fields : columns.reduce((row, column) => {
                        row[column.case_field_id] = valueProcessor(column.value, caseRow);
                        return row;
                    }, {})
                };
            });
}

function format(state)
{
    let formattedState = state.split("_").join(" ");
    return formattedState[0].toUpperCase() +  formattedState.slice(1);
}

function mapOnlineHearing(caseData, options) {
    let caseIds = caseData.map(caseRow => 'case_id=' + caseRow.id).join("&");
    let casesData = getOnlineHearing(caseIds, options)
        .then(hearings => {
            if (hearings.online_hearings) {
                let caseStateMap = new Map(hearings.online_hearings
                    .map(hearing => [Number(hearing.case_id), hearing.current_state]));
                caseData.forEach(caseRow => {
                    let state = caseStateMap.get(Number(caseRow.id));
                    if(state!= undefined && state!= null && state.state_name!= undefined && state.state_name != null) {
                        caseRow.status = format(state.state_name);
                        if(new Date(caseRow.last_modified) < new Date(state.state_datetime)) {
                            caseRow.last_modified = state.state_datetime;
                        }
                    }
                });
            }
            return caseData;
        });
    return casesData;
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

    getCases(userId, options)
        .then(([caseData, frCaseData]) => {
            console.log("FRcaseData => " , frCaseData);
            return Promise.all([
                mapOnlineHearing(caseData, options),
                mapOnlineHearing(frCaseData, options)
            ]);
            })
        .then(([casesData, frCasesData]) => {
            console.log('frCasesData' , frCasesData);
            let sscsResults = rawCasesReducer(casesData, sscsCaseListTemplate.columns, sscsCaseListTemplate.case_number.label)
            let frResults = rawCasesReducer(frCasesData, frCaseListTemplate.columns, frCaseListTemplate.case_number.label);
            const results = Array.prototype.concat(sscsResults, frResults)
                .filter(row => row.case_reference !== undefined && row.case_reference !== null && row.case_reference.trim().length > 0)
                .sort(function (result1, result2) {
            return new Date(result1.case_fields.dateOfLastAction) - new Date(result2.case_fields.dateOfLastAction);
        });
            console.log('final CASES DATA >>>>' , results);
            const aggregatedData = {...frCaseListTemplate, results: results};
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('content-type', 'application/json');
            console.log('Json >> ' ,JSON.stringify(aggregatedData));
            res.status(200).send(JSON.stringify(aggregatedData));
        }).catch(response => {
            console.log(response.error || response);
            res.status(response.statusCode || 500).send(response);
    });
};
