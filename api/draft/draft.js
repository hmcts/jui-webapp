const express = require('express');
const generateRequest = require('../lib/request');
const config = require('../../config');

function getDraft(id, options) {
    return generateRequest('GET', `${config.services.draft_store_api}/drafts/${id}`, options);
}

function getAllDrafts(options) {
    return generateRequest('GET', `${config.services.draft_store_api}/drafts`, options);
}

function createDraft(options) {
    return generateRequest('POST', `${config.services.draft_store_api}/drafts`, options);
}

function getDraftStoreHealth() {
    console.log('health');
    return generateRequest('GET', `${config.services.draft_store_api}/health`, {});
}

function getHeaders(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    };
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });

    router.get('/', (req, res, next) => {
        getAllDrafts(getHeaders(req)).pipe(res);
    });

    router.post('', (req, res, next) => {
        createDraft(getHeaders(req)).pipe(res);
    });

    router.get(':id', (req, res, next) => {
        const id = req.params.id;
        getDraft(id, getHeaders(req)).pipe(res);
    });


    router.get('/health', (req, res, next) => {
        getDraftStoreHealth().pipe(res);
    });

    app.use('/drafts', router);
};

module.exports.getDraft = getDraft;
module.exports.getAllDrafts = getAllDrafts;
module.exports.createDraft = createDraft;
