const sscsCaseListTemplate = require('./sscsCaseList.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const valueProcessor = require('../lib/processors/value-processor');

function getCases(userId, options, caseType = 'Benefit', caseStateId = 'appealCreated', jurisdiction = 'SSCS', benefitType = 'case.appeal.benefitType.code=PIP&') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?${benefitType}state=${caseStateId}&page=1&sortDirection=DESC`, options)
}

function getOnlineHearing(caseIds, options) {
    return generateRequest(`${config.services.coh_cor_api}/continuous-online-hearings/?case_id=${caseIds}`, options);
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
                        let caseStateMap = new Map(hearings.online_hearings.
                        map(hearing => [Number(hearing.case_id), hearing.current_question_state.state_name]));
                        caseData.forEach(caseRow => {
                            caseRow.status = caseStateMap.get(Number(caseRow.id));
                        });
                    }
                    return caseData;
                });
                return casesData;
            })
        .then(casesData => {
        let results = rawCasesReducer(casesData, sscsCaseListTemplate.columns).sort(function (result1, result2) {
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
