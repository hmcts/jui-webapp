const request = require('request-promise');
const express = require('express');
const router = express.Router();
const config = require('../../config');
const proxy = require('../lib/proxy');

function getOptions(url, params) {
    let options = {
        url: url, headers: {
            ...params.headers,
        }, json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return options;
}

function proxyDocumentRequest(url, req, res) {
    const options = getOptions(url, {
        headers: {
            'user-roles': req.auth.data,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    });
    request(url, options).pipe(res);
}

router.get('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('{}');
});

router.get('/:id', (req, res, next) => {
    const docId = req.params.id;
    const url = `${config.services.dm_store_api}/documents/${docId}`;
    proxyDocumentRequest(url, req, res);
});


router.get('/:id/binary', (req, res, next) => {
    const docId = req.params.id;
    const url = `${config.services.dm_store_api}/documents/${docId}/binary`;
    proxyDocumentRequest(url, req, res);
});

module.exports = router;
