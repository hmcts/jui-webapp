const retrieveHearingCallback = require('./hearing');
const createHearingCallback = require('./create');

module.exports = app => {
    retrieveHearingCallback(app);
    createHearingCallback(app);
};
