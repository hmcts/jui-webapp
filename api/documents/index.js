const express = require('express');
const { getDocument, getDocumentBinary } = require('../services/dm-store-api/dm-store-api');

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-roles': req.auth.data
        }
    };
}

module.exports = app => {
    const route = express.Router({ mergeParams: true });
    app.use('/documents', route);

    route.get('/:document_id', (req, res, next) => {
        getDocument(req.params.document_id, getOptions(req)).pipe(res);
    });

    route.get('/:document_id/binary', (req, res, next) => {
        getDocumentBinary(req.params.document_id, getOptions(req))
            .on('response', response => {
                response.headers['content-disposition'] = `attachment; ${response.headers['content-disposition']}`;
            })
            .pipe(res);
    });

};
