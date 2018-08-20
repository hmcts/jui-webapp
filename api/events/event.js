const express = require('express');
const generateRequest = require('../lib/request');
const config = require('../../config');
const moment = require('moment');


function getEvents(caseId, userId, options, caseType = 'Benefit', jurisdiction = 'SSCS') {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`, options)
        .then(reduceEvents);
}

function reduceEvents(events) {
    events = events || [];
    return events.map(event => {
        const createdDate = moment(event.created_date);
        const dateUtc = createdDate.utc().format();
        const date = createdDate.format('D MMM YYYY');
        const time = createdDate.format('HH:mma');

        return {
            title: event.event_name,
            by: `${event.user_first_name} ${event.user_last_name}`,
            dateUtc,
            date,
            time,
            documents: []
        };
    });
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/cases', router);

    router.get('/:case_id/events', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        getEvents(caseId, userId, {
            headers: {
                Authorization: `Bearer ${req.auth.token}`,
                ServiceAuthorization: req.headers.ServiceAuthorization
            }
        }).pipe(res);
    });
};

module.exports.getEvents = getEvents;
