const express = require('express');
const generateRequest = require('../lib/request');
const config = require('../../config');


function getJurisdictions(options) {
    console.log('getJurisdictions');
    return generateRequest('GET', `${config.services.ccd_def_api}/api/data/jurisdictions`, options);
}

function getCaseTypes(jurisdictions,options) {
    console.log(jurisdictions);
    return generateRequest('GET', `${config.services.ccd_def_api}/api/data/jurisdictions/${jurisdictions}/case-type`, options);
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/definitions', router);

    router.get('/jurisdictions', (req, res, next) => {
        getJurisdictions({
            headers: {
                Authorization: `Bearer ${req.auth.token}`,
                ServiceAuthorization: req.headers.ServiceAuthorization
            }
        }).pipe(res);
    });

    router.get('/jurisdictions/:jurisdictions', (req, res, next) => {
        const jurisdictions = req.params.jurisdictions;
        getCaseTypes(jurisdictions, {
            headers: {
                Authorization: `Bearer ${req.auth.token}`,
                ServiceAuthorization: req.headers.ServiceAuthorization
            }
        }).pipe(res);
    });
};

module.exports.getJurisdictions = getJurisdictions;
module.exports.getCaseTypes = getCaseTypes;
