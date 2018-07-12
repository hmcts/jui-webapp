const express = require('express');
const generateRequest = require('../lib/request');
const config = require('../../config');
const proxy = require('../lib/proxy');


function getDocumentBinary(docId, options) {
    return generateRequest(`${config.services.dm_store_api}/documents/${docId}/binary`, options);
}

function getDocument(docId, options) {
    return generateRequest(`${config.services.dm_store_api}/documents/${docId}`, options);
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

function getOptions(req) {
    const token = req.auth.token;
    let options = {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'ServiceAuthorization' : req.headers.ServiceAuthorization,
            'user-roles': req.auth.data,
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return options;
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

module.exports.getDocuments = getDocuments;