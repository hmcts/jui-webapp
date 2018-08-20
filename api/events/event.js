const express = require('express');
const config = require('../../config');
const generateRequest = require('../lib/request');

function reduceEvents(events) {
    events = events || [];
    return events.map(event => {
        return {
            event_name: event.event_name,
            user_first_name: event.user_first_name,
            user_last_name: event.user_last_name,
            created_date: event.created_date
        };
    });
}

function getEvents(caseId, userId, jurisdiction, caseType, options) {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`, options)
        .then(events => reduceEvents(events));
}


module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/cases', router);

    router.get('/jurisdiction/:jur/casetype/:casetype/:case_id/events', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const jurisdiction = req.params.jur;
        const caseType = req.params.casetype;


        getEvents(caseId, userId, jurisdiction, caseType, {
            headers: {
                Authorization: `Bearer ${req.auth.token}`,
                ServiceAuthorization: req.headers.ServiceAuthorization
            }
        })
            .then(events => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(events));
            });
    });
};

module.exports.getEvents = getEvents;

module.exports.reduceEvents = reduceEvents;
