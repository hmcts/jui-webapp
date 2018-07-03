const sscsCaseListTemplate = require('./sscsCaseList.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const valueProcessor = require('../lib/value-processor');

function getCases(userId, options, caseType = 'Benefit', caseStateId = 'appealCreated', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?state=${caseStateId}&page=1&sortDirection=DESC`, options)
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

    getCases(userId, {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'ServiceAuthorization' : req.headers.ServiceAuthorization
        }
    }).then(casesData => {
        const aggregatedData = {...sscsCaseListTemplate, results : rawCasesReducer(casesData, sscsCaseListTemplate.columns)};
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('content-type', 'application/json');
        res.status(200).send(JSON.stringify(aggregatedData));
    }).catch(response => {
        console.log(response.error || response);
        res.status(response.error.status || 500).send(response.error.message);
    });
};
