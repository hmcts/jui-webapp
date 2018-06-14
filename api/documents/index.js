const request = require('request-promise');
const jp = require('jsonpath');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const proxy = require('../lib/proxy');

function getOptions(url, params) {
    let options = {
        url : url, headers : {
            ...params.headers,
        }, json : true
    };
    if(config.useProxy) {
        options = proxy(options);
    }
    return options;
}

router.get('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('{}');
});

router.get('/:id', (req, res, next) => {
    const docId = req.params.id;
    const url = `${config.services.dm_store_api}/documents/${docId}/binary`
    const userRoles = 'caseworker-probate,caseworker-probate-issuer,caseworker-probate-examiner,caseworker-probate-authoriser,caseworker-cmc,caseworker-sscs,caseworker-divorce,caseworker-divorce-courtadmin,caseworker-test,caseworker-reference-data,caseworker-sscs-callagent,caseworker,caseworker-probate-loa1,caseworker-probate-issuer-loa1,caseworker-probate-examiner-loa1,caseworker-probate-authoriser-loa1,caseworker-cmc-loa1,caseworker-sscs-loa1,caseworker-divorce-loa1,caseworker-divorce-courtadmin-loa1,caseworker-test-loa1,caseworker-reference-data-loa1,caseworker-sscs-callagent-loa1,caseworker-loa1';
    const options = getOptions(url, {
        headers : {
            'user-roles' : userRoles,
            'ServiceAuthorization' : req.headers.ServiceAuthorization
        }
    });
    
    request(url, options).pipe(res);
    
});

module.exports = router;
