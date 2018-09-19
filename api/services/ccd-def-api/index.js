const definitionsRoute = require('./ccd-def-api');
const { getCaseTypes, getJurisdictions } = require('./ccd-def-api');

module.exports = app => {
    definitionsRoute(app);
};

module.exports.getCaseTypes = getCaseTypes;

module.exports.getJurisdictions = getJurisdictions;
