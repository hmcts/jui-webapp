const eventsRoute = require('./event');
const {getEvents} = require('./event');

module.exports = (app) => {
    eventsRoute(app);
};

module.exports.getEvents = getEvents;
