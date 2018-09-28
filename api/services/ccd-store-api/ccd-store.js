const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request');
const mockRequest = require('../../lib/mockRequest');

const url = config.services.ccd_data_api;

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

function getCCDCases(userId, jurisdictions, options) {
    const promiseArray = [];
    jurisdictions.forEach(jurisdiction => {
        if (process.env.JUI_ENV === 'mock') {
            promiseArray.push(mockRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}/cases?sortDirection=DESC${jurisdiction.filter}`, options))
        } else {
            promiseArray.push(generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}/cases?sortDirection=DESC${jurisdiction.filter}`, options))
        }
    });
    return Promise.all(promiseArray);
}


module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/ccd-store', router);

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};

module.exports.getCCDCases = getCCDCases;
