const generateRequest = require('../lib/request');
const generatePostRequest = require('../lib/postRequest');
const config = require('../../config');

function postQuestion(hearingId, headers, body) {
    return generatePostRequest(`${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions`, {headers, body})
}

function postHearing(caseId, userId, headers, jurisdictionId = 'SSCS') {
    const body = {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{identity_token: 'string', name: userId}],
        start_date: (new Date()).toISOString()
    };
    
    return generatePostRequest(`${config.services.coh_cor_api}/continuous-online-hearings`, {headers, body})
        .then(hearing => hearing.online_hearing_id)
}

function getHearingId(caseId, userId, headers) {
    return generateRequest(`${config.services.coh_cor_api}/continuous-online-hearings?case_id=${caseId}`, {headers})
        .then(hearing => hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, headers));
}

function formatQuestion(body, userId) {
    return {
        "owner_reference": userId,
        "question_body_text": body.question,
        "question_header_text": body.subject,
        "question_ordinal": "1",
        "question_round": "1"
    };
}

//POST question callback
module.exports = (req, res, next) => {
    const userId = req.auth.userId;
    const caseId = req.params.case_id;
    const headers = {'Authorization' : `Bearer ${req.auth.token}`, 'ServiceAuthorization' : req.headers.ServiceAuthorization};
    const body = formatQuestion(req.body, userId);
    
    getHearingId(caseId, userId, headers)
        .then(hearingId => postQuestion(hearingId, headers, body))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(201).send(JSON.stringify(response));
        })
        .catch(response => {
            console.log(response.error || response);
            res.status(response.error.status).send(response.error.message);
        });
};
