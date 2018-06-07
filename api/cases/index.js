const request = require('request-promise');
const jp = require('jsonpath');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const proxy = require('../lib/proxy');
const jwtDecode = require('jwt-decode');
const schema = require('../benefit_schema.json');
const sscsCaseTemplate = require('./sscsCase.template');
const sscsCaseListTemplate = require('./sscsCaseList.template');

function generateRequest(url, params) {
  let options = {
    url : url,
    headers : {
      ...params.headers,
      'Content-Type' : 'application/json'
    },
    json : true
  };
  if(config.useProxy) {
    options = proxy(options);
  }
  return request(options);
}


function getCase(caseId, userId, options) {
  return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/SSCS/case-types/jui_test/cases/${caseId}`, options)
}

function getCases(userId, options, caseStateId = 'appealCreated', jurisdiction = 'SSCS') {
    // userId = '6687';
    console.log('***********************************************************************************', userId);
    jurisdiction = 'PROBATE';
    caseStateId = 'CaseCreated'
    // https://ccd-api-gateway-web-saat.service.core-compute-saat.internal/aggregated/caseworkers/:uid/jurisdictions/PROBATE/case-types/GrantOfRepresentation/cases?view=WORKBASKET&state=CaseCreated&page=1
    return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/GrantOfRepresentation/cases?state=${caseStateId}&page=1`, options);

    // return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/jui_test/cases?state=${caseStateId}&page=1`, options)
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
                // 'parties': `${curr['case_data'].appeal.appellant.name.firstName} vs ${curr['case_data'].appeal.appellant.name.lastName}`,
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
    const token = req.auth.token;
    const userId = req.auth.sub;
    const caseId = req.params.case_id;
    getCase(caseId, userId, {
        headers: {
            'Authorization': `Bearer ${token}`,
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
    const token = req.auth.token;
    const userId = req.auth.userId;

    getCases(userId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    }).then(casesData => {
        const aggregatedData = {...sscsCaseListTemplate, results: rawCasesReducer(casesData)};

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(aggregatedData));
    }).catch(e => console.log(e))
});


module.exports = router;
