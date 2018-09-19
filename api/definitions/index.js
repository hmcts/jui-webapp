const definitionsRoute = require('./definitions');
const { getCaseTypes, getJurisdictions } = require('./definitions');

module.exports = app => {
    definitionsRoute(app);
};

module.exports.getCaseTypes = getCaseTypes;
module.exports.getJurisdictions = getJurisdictions;
