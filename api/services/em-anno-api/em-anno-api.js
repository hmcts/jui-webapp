const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request');

const url = config.services.em_anno_api;

function getAnnotationSet(uuid, options) {
    return generateRequest('GET', `${url}/annotation-sets/${uuid}`, options);
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
    app.use('/em-anno', router);

    router.get('/annotations-set/:uuid', (req, res, next) => {
        const uuid = req.params.uuid;

        getAnnotationSet(uuid, getOptions(req)).pipe(res);
    });

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};
