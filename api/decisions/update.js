const express = require('express');
const config = require('../../config');
const generateRequest = require('../lib/request');

function postHearing(caseId, userId, headers, jurisdictionId = 'SSCS') {
    const body = {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: (new Date()).toISOString()
    };

    return generateRequest('POST', `${config.services.coh_cor_api}/continuous-online-hearings`,
        { headers, body }
    ).then(hearing => hearing.online_hearing_id);
}

function getHearingId(caseId, userId, headers) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings?case_id=${caseId}`, { headers })
        .then(hearing => hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, headers));
}

function putDecision(hearingId, headers, body) {
    return generateRequest('PUT', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/decisions`, { headers, body });
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/decisions', router);

    router.put('/:case_id', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const headers = {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        };

        getHearingId(caseId, userId, headers)
            .then(hearingId => putDecision(hearingId, headers, req.body))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200)
                    .send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status)
                    .send(response.error.message);
            });
    });
};
