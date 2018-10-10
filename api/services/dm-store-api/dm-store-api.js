const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request');

const url = config.services.dm_store_api;

function getDocument(docId, options) {
    return generateRequest('GET', `${url}/documents/${docId}`, options);
}

function getDocumentBinary(docId, options) {
    return generateRequest('GET', `${url}/documents/${docId}/binary`, options);
}

function getDocumentThumbnail(docId, options) {
    return generateRequest('GET', `${url}/documents/${docId}/thumbnail`, options);
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options);
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options);
}

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    };
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/dm-store', router);

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};

module.exports.getDocument = getDocument;
module.exports.getDocumentBinary = getDocumentBinary;
module.exports.getDocumentThumbnail = getDocumentThumbnail;
