const express = require('express');
const generateRequest = require('../lib/request');
const config = require('../../config');

function getHearingByCase(caseId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings?case_id=${caseId}`, options);
}

function postHearing(caseId, userId, options, jurisdiction = 'SSCS') {
    const body = {
        case_id: caseId,
        jurisdiction: jurisdiction,
        panel: [{identity_token: 'string', name: userId}],
        start_date: (new Date()).toISOString()
    };

    return generateRequest('POST', `${config.services.coh_cor_api}/continuous-online-hearings`, {...options, body: body})
        .then(hearing => hearing.online_hearing_id)
}

function getQuestions(hearingId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions`, options);
}

function getRounds(hearingId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questionrounds`, options);
}

function formatQuestions(questions) {
    return questions.map(item => {
        return {
            id: item.question_id,
            header: item.question_header_text,
            body: item.question_body_text,
            owner_reference: item.owner_reference,
            state_datetime: item.current_question_state.state_datetime,
            state: item.current_question_state.state_name
        }
    });
}

function formatRounds(rounds) {
    return rounds.map(round => {
        return {
            question_round_number: round.question_round_number,
            state: round.question_round_state.state_name,
            questions: round.question_references ? formatQuestions(round.question_references) : []
        }
    });
}

function formatQuestionRes(question, answers) {
    return {
        id: question.question_id,
        header: question.question_header_text,
        body: question.question_body_text,
        owner_reference: question.owner_reference,
        state_datetime: question.current_question_state.state_datetime,
        answer: (answers !== undefined && answers.length > 0 ? answers[0] : null)
    };
}

function getQuestionsByCase(caseId, userId, options, jurisdiction) {
    return getHearingByCase(caseId, options)
        .then(hearing => hearing.online_hearings[0] ?
            hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, options, jurisdiction))
        .then(hearingId => getQuestions(hearingId, options))
        .then(questions => questions && formatQuestions(questions.questions));
}


function getAllQuestionsByCase(caseId, userId, options, jurisdiction) {
    return getHearingByCase(caseId, options)
        .then(hearing => hearing.online_hearings[0] ?
            hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, options, jurisdiction))
        .then(hearingId => getRounds(hearingId, options))
        .then(rounds => rounds && formatRounds(rounds.question_rounds));
}

function postQuestion(hearingId, options) {
    return generateRequest('POST', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions`, options);
}

function getQuestion(hearingId, questionId, options) {
    return Promise.all([
        generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options),
        generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`, options)
    ]);
}

function putQuestion(hearingId, questionId, options) {
    return generateRequest('PUT', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options);
}

function deleteQuestion(hearingId, questionId, options) {
    return generateRequest('DELETE', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options);
}

function updateRoundToIssued(hearingId, roundId, options) {
    options.body = {
        state_name: 'question_issued'
    };
    return generateRequest('PUT', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questionrounds/${roundId}`, options);
}

function formatQuestion(body, userId) {
    return {
        owner_reference: userId,
        question_body_text: body.question,
        question_header_text: body.subject,
        question_ordinal: '1',
        question_round: '1',
        question_state: 'question_drafted'
    };
}

module.exports = (app) => {
    const route = express.Router({mergeParams:true});
    app.use('/cases', route);

    route.get('/:case_id/questions/:question_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const questionId = req.params.question_id;
        const userId = req.auth.userId;
        const body = formatQuestion(req.body, userId);
        const options = {
            headers : {
                'Authorization' : `Bearer ${req.auth.token}`,
                'ServiceAuthorization' : req.headers.ServiceAuthorization
            },
            body: body
        };

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => getQuestion(hearingId, questionId, options))
            .then(([question, answers]) => question && formatQuestionRes(question, answers))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
             .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });

    route.get('/:case_id/questions', (req, res, next) => {
        const caseId = req.params.case_id;
        const userId = req.auth.userId;
        const options = {
            headers : {
                'Authorization' : `Bearer ${req.auth.token}`,
                'ServiceAuthorization' : req.headers.ServiceAuthorization
            }
        };

        return getQuestionsByCase(caseId, userId, options, 'SSCS')
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(201).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });

    route.post('/:case_id/questions', (req, res, next) => {
        const caseId = req.params.case_id;
        const userId = req.auth.userId;
        const body = formatQuestion(req.body, userId);
        const options = {
            headers : {
                'Authorization' : `Bearer ${req.auth.token}`,
                'ServiceAuthorization' : req.headers.ServiceAuthorization
            },
            body: body
        };

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, options))
            .then(hearingId => postQuestion(hearingId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(201).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });

    route.put('/:case_id/questions/:question_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const questionId = req.params.question_id;
        const userId = req.auth.userId;
        const body = formatQuestion(req.body, userId);
        const options = {
            headers : {
                'Authorization' : `Bearer ${req.auth.token}`,
                'ServiceAuthorization' : req.headers.ServiceAuthorization
            },
            body: body
        };

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => putQuestion(hearingId, questionId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });

    route.delete('/:case_id/questions/:question_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const questionId = req.params.question_id;
        const options = {
            headers : {
                'Authorization' : `Bearer ${req.auth.token}`,
                'ServiceAuthorization' : req.headers.ServiceAuthorization
            }
        };

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => deleteQuestion(hearingId, questionId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });


    route.put('/:case_id/questions/rounds/:round_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const roundId = req.params.round_id;
        const options = {
            headers : {
                'Authorization' : `Bearer ${req.auth.token}`,
                'ServiceAuthorization' : req.headers.ServiceAuthorization
            }
        };

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => updateRoundToIssued(hearingId, roundId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });


};

module.exports.getQuestions = getQuestions;
module.exports.postHearing = postHearing;
module.exports.getAllQuestionsByCase = getAllQuestionsByCase;
