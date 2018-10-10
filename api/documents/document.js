const express = require('express');
const getOptions = require('./options');
const { getDocument, getDocumentBinary } = require('../services/dm-store-api/dm-store-api');

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

module.exports = app => {
    const route = express.Router({ mergeParams: true });
    app.use('/documents', route);

    route.get('/:document_id/binary', (req, res, next) => {
        const documentId = req.params.document_id;
        getDocumentBinary(documentId, getOptions(req))
            .on('response', response => {
                response.headers['content-disposition'] = `attachment; ${response.headers['content-disposition']}`;
            })
            .pipe(res);
    });

    route.get('/:document_id', (req, res, next) => {
        const documentId = req.params.document_id;
        getDocument(documentId, getOptions(req)).pipe(res);
    });
};

module.exports.getDocument = getDocument;

module.exports.getDocuments = getDocuments;

module.exports.getDocumentBinary = getDocumentBinary;
