const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request');

const url = config.services.draft_store_api;

function getDraft(id, options) {
    return generateRequest('GET', `${url}/drafts/${id}`, options);
}

function getAllDrafts(options) {
    return generateRequest('GET', `${url}/drafts`, options);
}

function createDraft(options) {
    return generateRequest('POST', `${url}/drafts`, options);
}

function getHealth() {
    return generateRequest('GET', `${url}/health`, {});
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
    app.use('/draft-store', router);

    router.get('/', (req, res, next) => {
        getAllDrafts(getOptions(req)).pipe(res);
    });

    router.post('', (req, res, next) => {
        createDraft(getOptions(req)).pipe(res);
    });

    router.get(':id', (req, res, next) => {
        const id = req.params.id;
        getDraft(id, getOptions(req)).pipe(res);
    });

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};

module.exports.getDraft = getDraft;

module.exports.getAllDrafts = getAllDrafts;

module.exports.createDraft = createDraft;
