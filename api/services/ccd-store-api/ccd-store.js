const express = require('express');
const config = require('../../../config');
const generateRequest = require('../../lib/request');
const mockRequest = require('../../lib/mockRequest');

const url = config.services.ccd_data_api;

//TODO remove the CCD part
function getCCDCase(userId, jurisdiction, caseType, caseId, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`;
    return process.env.JUI_ENV === 'mock' ? mockRequest('GET', urlX, options) : generateRequest('GET', urlX, options);
}

function getCCDEvents(caseId, userId, jurisdiction, caseType, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`;
    return (process.env.JUI_ENV === 'mock' ? mockRequest('GET', urlX, options) : generateRequest('GET', urlX, options));
}

function getCCDCases(userId, jurisdiction, caseType, filter, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC${filter}`;
    return process.env.JUI_ENV === 'mock' ? mockRequest('GET', urlX, options) : generateRequest('GET', urlX, options);
}

// TODO: This should eventually replace ccd better mutijud search
function getMutiJudCCDCases(userId, jurisdictions, options) {
    const promiseArray = [];
    jurisdictions.forEach(jurisdiction => {
        promiseArray.push(getCCDCases(userId, jurisdiction.jur, jurisdiction.caseType, jurisdiction.filter, options));
    });
    return Promise.all(promiseArray);
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
    app.use('/ccd-store', router);

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};

module.exports.getCCDCase = getCCDCase;
module.exports.getCCDEvents = getCCDEvents;

module.exports.getCCDCases = getCCDCases;

module.exports.getMutiJudCCDCases = getMutiJudCCDCases;
