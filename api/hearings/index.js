const generateRequest = require('../lib/request');
const config = require('../../config');

function postHearing(caseId, userId, headers, jurisdictionId = 'SSCS') {
    const body = {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: (new Date()).toISOString()
    };

    return generateRequest('POST', `${config.services.coh_cor_api}/continuous-online-hearings`, { headers, body })
        .then(hearing => hearing.online_hearing_id);
}

function getHearingId(caseId, userId, headers) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings?case_id=${caseId}`, { headers })
        .then(h => h.online_hearings[0] ? h.online_hearings[0].online_hearing_id : postHearing(caseId, userId, headers));
}

function getHearing(hearingId, headers) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}`, headers);
}

module.exports = (req, res, next) => {
    const userId = req.auth.userId;
    const caseId = req.params.case_id;
    const headers = {
        'Authorization' : `Bearer ${req.auth.token}`,
        'ServiceAuthorization' : req.headers.ServiceAuthorization
    };

    getHearingId(caseId, userId, headers)
        .then(hearingId => getHearing(hearingId, headers))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('content-type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        })
        .catch(response => {
            console.log(response.error || response);
            res.status(response.error.status).send(response.error.message);
        });
};
