const documentsRoute = require('./document');
const { getDocuments } = require('./document');

module.exports = app => documentsRoute(app);

module.exports.getDocuments = getDocuments;
