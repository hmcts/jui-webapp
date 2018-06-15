const sscsCaseListTemplate = require('./sscsCaseList.template');
const generateRequest = require('../lib/request');
const config = require('../../config');
const jp = require('jsonpath');

function getCases(userId, options, caseType = 'Benefit', caseStateId = 'appealCreated', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?state=${caseStateId}&page=1`, options)
}

function dataLookup(column, caseRow) {
    if (column.value) {
        return column.value;
    }
    if (typeof column.lookup === "string") {
        return jp.query(caseRow, column.lookup);
    } else if (column.lookup.length) {
        return column.lookup.map(part => {
            if (part.startsWith('$')) {
                return jp.query(caseRow, part);
            }
            return part;
        }).join(' ');
    }
}

function rawCasesReducer(cases, columns) {
    return cases.map(caseRow => {
        return {
            case_id: caseRow.id,
            case_fields : columns.reduce((row, column) => {
                row[column.case_field_id] = dataLookup(column, caseRow['case_data']);
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
        res.status(200).send(JSON.stringify(aggregatedData));
    }).catch(e => console.log(e))
};
