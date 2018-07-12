const jp = require('jsonpath');
const express = require('express');
const router = express.Router();
const eventsRoute = require('./event');
const {getEvents} = require('./event');



module.exports = (app) => {
    eventsRoute(app);
};
module.exports.getEvents = getEvents;

