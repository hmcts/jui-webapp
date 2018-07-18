const express = require('express');
const generateRequest = require('../lib/request');
const config = require('../../config');
const proxy = require('../lib/proxy');
const getOptions = require('./options');

function getDocumentBinary(docId, options) {
    return generateRequest('GET', `${config.services.dm_store_api}/documents/${docId}/binary`, options);
}

function getDocument(docId, options) {
    return generateRequest('GET', `${config.services.dm_store_api}/documents/${docId}`, options);
}

function getDocumentArray(docIds = [], options) {
    const promiseArray = [];
    docIds.forEach(docId => {
        promiseArray.push(getDocument(docId, options));
    });
    return Promise.all(promiseArray);
}

function getDocuments(documentIds = [], options) {
    return getDocumentArray(documentIds, options);
}

module.exports = (app) => {
    const route = express.Router({mergeParams:true});
    app.use('/documents', route);

    route.get('/:document_id/binary', (req, res, next) => {
        const documentId = req.params.document_id;
        getDocumentBinary(documentId, getOptions(req)).pipe(res);
    });

    route.get('/:document_id', (req, res, next) => {
        const documentId = req.params.document_id;
        getDocument(documentId, getOptions(req)).pipe(res);
    });
};
module.exports.getDocument = getDocument;
module.exports.getDocuments = getDocuments;
module.exports.getDocumentBinary = getDocumentBinary;
