
const retrieveDecisionCallback = require('./retrieve');
const createDecisionCallback = require('./create');
const updateDecisionCallback = require('./update');


module.exports = app => {
    retrieveDecisionCallback(app);
    createDecisionCallback(app);
    updateDecisionCallback(app);
};
