const express = require('express');
const otp = require('otp');
const config = require('../../../config');
const generateRequest = require('../../lib/request/request');

const url = config.services.s2s;
const microservice = config.microservice;
const s2sSecret = process.env.JUI_S2S_SECRET || 'AAAAAAAAAAAAAAAA'; // TODO: replace JUI_S2S_SECRET => S2S_SECRET

function postS2SLease() {
    const oneTimePassword = otp({secret: s2sSecret}).totp();
    const options = {
        headers: {},
        body: {
            microservice,
            oneTimePassword
        }
    };
    return generateRequest('POST', `${url}/lease`, options);
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
    app.use('/s2s', router);

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res);
    });

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res);
    });
};

module.exports.getInfo = getInfo;
module.exports.getHealth = getHealth;

module.exports.postS2SLease = postS2SLease;
