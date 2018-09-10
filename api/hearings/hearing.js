const express = require('express');
const config = require('../../config');
const generateRequest = require('../lib/request');


function getOptions(req) {
    return {
        headers: {
            'Authorization': `Bearer ${req.auth.token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    };
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

function getHearing(hearingId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}`, options);
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/hearings', router);

    router.get('/:case_id', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const options = getOptions(req);

        getHearingId(caseId, userId, options)
            .then(hearingId => getHearing(hearingId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });
};
