const sscsCaseListTemplate = require('./sscsCaseList.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const valueProcessor = require('../lib/processors/value-processor');

function getCases(userId, options, caseType = 'Benefit', caseStateId = 'appealCreated', jurisdiction = 'SSCS', benefitType = 'case.appeal.benefitType.code=PIP&') {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?${benefitType}state=${caseStateId}&sortDirection=DESC`, options)
}

function getOnlineHearing(caseIds, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/?${caseIds}`, options);
}

function rawCasesReducer(cases, columns) {
    return cases.map(caseRow => {
                return {
                    case_id: caseRow.id,
                    case_reference: valueProcessor(sscsCaseListTemplate.case_number.label, caseRow),
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
        .then(caseData => {
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
            })
        .then(casesData => {
        const results = rawCasesReducer(casesData, sscsCaseListTemplate.columns)
            .filter(row => row.case_reference !== undefined && row.case_reference !== null && row.case_reference.trim().length > 0)
            .sort(function (result1, result2) {
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
