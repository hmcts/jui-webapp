const caseListRoute = require('./case-list');
const caseRoute = require('./case');

module.exports = app => {
    caseListRoute(app);
    caseRoute(app);
};
