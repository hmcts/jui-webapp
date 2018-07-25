const jp = require('jsonpath');
const express = require('express');

const router = express.Router();
const documentsRoute = require('./document');
const { getDocuments } = require('./document');

module.exports = app => {
    documentsRoute(app);
};

module.exports.getDocuments = getDocuments;
