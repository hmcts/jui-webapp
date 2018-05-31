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
const _token = '';

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
  return generateRequest(`${config.services.ccd_data_api}/caseworkers/5899/jurisdictions/SSCS/case-types/jui_test/cases/1526651248651203`, options)
}

function getCases(userId = '5899', options, caseStateId = 'appealCreated', jurisdiction = 'SSCS') {
  return generateRequest(`${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/jui_test/cases?state=${caseStateId}&page=1`, options)
}

function replaceSectionValues(section, caseData) {
  if(section.sections && section.sections.length) {
    section.sections.forEach(childSection => {
      replaceSectionValues(childSection, caseData);
    });
  } else {
    section.fields.forEach(field => {
      field.value = jp.query(caseData, field.lookup);
      delete field.lookup;
    });
  }
}

function rawCasesReducer(cases) {
  return cases.reduce((acc, curr) => {
    acc.push({
      'case_id' : curr.id, 'case_fields' : {
        'caseReference' : null,
        'parties' : `${curr['case_data'].appeal.appellant.name.firstName} vs ${curr['case_data'].appeal.appellant.name.lastName}`,
        'type' : curr.jurisdiction,
        'status' : 'unknown',
        'caseCreated' : curr.created_date,
        'caseLastActioned' : curr.last_modified
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
    headers : {
      'Authorization' : token,
      'ServiceAuthorization' : req.headers.ServiceAuthorization
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
    headers : {
      'Authorization' : token,
      'ServiceAuthorization' : req.headers.ServiceAuthorization
    }
  }).then(casesData => {
    const aggregatedData = {...sscsCaseListTemplate, results : rawCasesReducer(casesData)};
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(aggregatedData));
  }).catch(e => console.log(e))
});


module.exports = router;
