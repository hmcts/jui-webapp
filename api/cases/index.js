const request = require('request-promise');
const jp = require('jsonpath');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const proxy = require('../../lib/proxy');
const jwtDecode = require('jwt-decode');
const schema = require('../benefit_schema.json');
const sscsCaseTemplate = require('./sscsCase.template');
const sscsCaseListTemplate = require('./sscsCaseList.template');
const _token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1cHBubmdlbGp1ZzV1a2RpOHVmOGc3bXJvMiIsInN1YiI6IjU4OTkiLCJpYXQiOjE1Mjc4NDQ4ODIsImV4cCI6MTUyNzg3MzY4MiwiZGF0YSI6ImNhc2V3b3JrZXItcHJvYmF0ZSxjYXNld29ya2VyLXByb2JhdGUtaXNzdWVyLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lcixjYXNld29ya2VyLXByb2JhdGUtYXV0aG9yaXNlcixjYXNld29ya2VyLWNtYyxjYXNld29ya2VyLXNzY3MsY2FzZXdvcmtlci1kaXZvcmNlLGNhc2V3b3JrZXItZGl2b3JjZS1jb3VydGFkbWluLGNhc2V3b3JrZXItdGVzdCxjYXNld29ya2VyLXJlZmVyZW5jZS1kYXRhLGNhc2V3b3JrZXItc3Njcy1jYWxsYWdlbnQsY2FzZXdvcmtlcixjYXNld29ya2VyLXByb2JhdGUtbG9hMSxjYXNld29ya2VyLXByb2JhdGUtaXNzdWVyLWxvYTEsY2FzZXdvcmtlci1wcm9iYXRlLWV4YW1pbmVyLWxvYTEsY2FzZXdvcmtlci1wcm9iYXRlLWF1dGhvcmlzZXItbG9hMSxjYXNld29ya2VyLWNtYy1sb2ExLGNhc2V3b3JrZXItc3Njcy1sb2ExLGNhc2V3b3JrZXItZGl2b3JjZS1sb2ExLGNhc2V3b3JrZXItZGl2b3JjZS1jb3VydGFkbWluLWxvYTEsY2FzZXdvcmtlci10ZXN0LWxvYTEsY2FzZXdvcmtlci1yZWZlcmVuY2UtZGF0YS1sb2ExLGNhc2V3b3JrZXItc3Njcy1jYWxsYWdlbnQtbG9hMSxjYXNld29ya2VyLWxvYTEiLCJ0eXBlIjoiQUNDRVNTIiwiaWQiOiI1ODk5IiwiZm9yZW5hbWUiOiJTdHVhcnQiLCJzdXJuYW1lIjoiUGx1bW1lciIsImRlZmF1bHQtc2VydmljZSI6IkNDRCIsImxvYSI6MSwiZGVmYXVsdC11cmwiOiJodHRwczovL3d3dy5jY2QuZGVtby5wbGF0Zm9ybS5obWN0cy5uZXQiLCJncm91cCI6ImNhc2V3b3JrZXIifQ.KaLql7vVX8YbBRPStjXTLIf6c3ot4hj1wuUJTxLEk90';

function generateRequest(url, params) {
    let options = {
        url: url,
        headers: {
            ...params.headers,
            'Content-Type': 'application/json'
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return request(options);
}


function getCase(caseId, userId, options) {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/5899/jurisdictions/SSCS/case-types/jui_test/cases/1526651248651203`, options)
}

function getCases(userId = '5899', options, caseStateId = 'appealCreated', jurisdiction = 'SSCS') {
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/jui_test/cases?state=${caseStateId}&page=1`, options)
}

function replaceSectionValues(section, caseData) {
    if (section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData);
        });
    } else {
        section.fields.forEach(field => {
            if (field.lookup) {
                field.value = jp.query(caseData, field.lookup);
                delete field.lookup;
            }
        });
    }
}

function rawCasesReducer(cases) {
    return cases.reduce((acc, curr) => {
        acc.push({
            'case_id': curr.id, 'case_fields': {
                'caseReference': null,
                'parties': `${curr['case_data'].appeal.appellant.name.firstName} vs ${curr['case_data'].appeal.appellant.name.lastName}`,
                'type': curr.jurisdiction,
                'status': 'unknown',
                'caseCreated': curr.created_date,
                'caseLastActioned': curr.last_modified
            }
        });

        return acc;

    }, []);
}

//Get case
router.get('/:case_id', (req, res, next) => {
    const token = `Bearer ${_token}`;
    const tokenData = jwtDecode(token);
    const caseId = req.params.case_id;
    const userId = tokenData.id;

    getCase(caseId, userId, {
        headers: {
            'Authorization': token,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    }).then(caseData => {
        const schema = JSON.parse(JSON.stringify(sscsCaseTemplate));
        schema.sections.forEach(section => {
            replaceSectionValues(section, caseData);
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(schema));
    }).catch(e => console.log(e))
});


//List of cases
router.get('/', (req, res, next) => {
    const token = `Bearer ${_token}`;
    const tokenData = jwtDecode(token);
    const userId = tokenData.id;

    getCases(userId, {
        headers: {
            'Authorization': token,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    }).then(casesData => {
        const aggregatedData = {...sscsCaseListTemplate, results: rawCasesReducer(casesData)};

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(aggregatedData));
    }).catch(e => console.log(e))
});


module.exports = router;
