const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request');


function getJurisdictions(options) {
    return generateRequest('GET', `${config.services.ccd_def_api}/api/data/jurisdictions`, options);
}

function getCaseTypes(jurisdictions, options) {
    return generateRequest('GET', `${config.services.ccd_def_api}/api/data/jurisdictions/${jurisdictions}/case-type`, options);
}

function getHealth(options) {
    return generateRequest('GET', `${config.services.ccd_def_api}/health`, options);
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
    app.use('/definitions', router);

    router.get('/jurisdictions', (req, res, next) => {
        getJurisdictions(getOptions(req)).pipe(res);
    });

    router.get('/jurisdictions/:jurisdictions', (req, res, next) => {
        const jurisdictions = req.params.jurisdictions;
        getCaseTypes(jurisdictions, getOptions(req)).pipe(res);
    });

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};

module.exports.getJurisdictions = getJurisdictions;

module.exports.getCaseTypes = getCaseTypes;
