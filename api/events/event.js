const express = require('express');
const moment = require('moment');
const config = require('../../config');
const generateRequest = require('../lib/request');

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

function getHistory(arrObject) {
   return arrObject.map(arr => arr.history)
        .reduce((history, item) => {
            return history.concat(item);
        }, []);
}
function reduceCohEvents(events) {
    return events.map(event => {
        const createdDate = moment(event.state_datetime);
        const dateUtc = createdDate.utc().format();
        const date = createdDate.format('D MMM YYYY');
        const time = createdDate.format('HH:mma');
        return {
            title: event.state_desc,
            by: 'coh',
            dateUtc,
            date,
            time,
            documents: []
        };
    });
}

function mergeCohEvents(eventsJson) {
        let history = eventsJson.online_hearing.history;
        let questionHistory = eventsJson.online_hearing.questions ? getHistory(eventsJson.online_hearing.questions) : [];
        let answersHistory = eventsJson.online_hearing.answers ? getHistory(eventsJson.online_hearing.answers): [];
        let decisionHistory = eventsJson.online_hearing.decision ? eventsJson.online_hearing.decision.history: [];
        return [...history, ...questionHistory, ...answersHistory, ...decisionHistory];
}

function sortEvents(events) {
    return events.sort((result1, result2) => {
        moment.utc(result2.dateUtc).diff(moment.utc(result1.dateUtc));
    })
}

function getCcdEvents(caseId, userId, jurisdiction, caseType, options) {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`, options)
        .then(events => reduceEvents(events));
}

function getCohEvents(caseId, userId, options) {
    return getHearingId(caseId, userId, options)
        .then(hearingId => {
            return getOnlineHearingConversation(hearingId, options)
                .then(mergeCohEvents)
                .then(reduceCohEvents);
        })
}

function getEvents(caseId, userId, jurisdiction, caseType, options) {
    const promiseArray = [];
     promiseArray.push(getCcdEvents(caseId, userId, jurisdiction, caseType, options));
     promiseArray.push(getCohEvents(caseId, userId, options));
      return Promise.all(promiseArray)
          .then(results => {
              let events = [...results[0], ...results[1]];
              return sortEvents(events);
          });
}

function postHearing(caseId, userId, options, jurisdictionId = 'SSCS') {
    const body = {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: (new Date()).toISOString()
    };

    return generateRequest('POST', `${config.services.coh_cor_api}/continuous-online-hearings`, options, body)
        .then(hearing => hearing.online_hearing_id);
}

function getHearingId(caseId, userId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings?case_id=${caseId}`, options)
        .then(h => h.online_hearings[0] ? h.online_hearings[0].online_hearing_id : postHearing(caseId, userId, options));
}

function getOnlineHearingConversation(onlineHearingId, options) {
    return generateRequest('GET',`${config.services.coh_cor_api}/continuous-online-hearings/${onlineHearingId}/conversations`, options);
}

function getOptions(req) {
    return {
        headers: {
            'Authorization': `Bearer ${req.auth.token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    };
}


module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/cases', router);

    router.get('/jurisdiction/:jur/casetype/:casetype/:case_id/events', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const jurisdiction = req.params.jur;
        const caseType = req.params.casetype;

        getEvents(caseId, userId, jurisdiction, caseType, getOptions(req))
            .then(events => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(events));
            });
    });
};

module.exports.getEvents = getEvents;

module.exports.reduceEvents = reduceEvents;
