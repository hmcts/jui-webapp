
const retrieveDecisionCallback = require('./retrieve');
const createDecisionCallback = require('./create');
const updateDecisionCallback = require('./update');
const stateDecisionCallback = require('./state');


module.exports = app => {
    retrieveDecisionCallback(app);
    createDecisionCallback(app);
    updateDecisionCallback(app);
    stateDecisionCallback(app);
};
