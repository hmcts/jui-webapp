const express = require('express');
const moment = require('moment');
const generateRequest = require('../lib/request');
const config = require('../../config');

// Hearings
function getHearingByCase(caseId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings?case_id=${caseId}`, options);
}

// Create a new hearing
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

// Questions
function getQuestions(hearingId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions`, options);
}

function getQuestion(hearingId, questionId, options) {
    return Promise.all([
        generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options),
        generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`, options)
    ]);
}

function postQuestion(hearingId, options) {
    return generateRequest('POST', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions`, options);
}

function putQuestion(hearingId, questionId, options) {
    return generateRequest('PUT', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options);
}

function deleteQuestion(hearingId, questionId, options) {
    return generateRequest('DELETE', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options);
}


function postAnswer(hearingId, questionId, body, options) {
    return generateRequest('POST', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`, {...options, body: body});
}

function answerAllQuestions(hearingId, questionIds, options) {
    let arr = [];
    let body = formatAnswer();// {answer_text: "The answer provided!", answer_state: "answer_submitted"};
    questionIds.forEach(id => arr.push(
        postAnswer(hearingId, id, body,  options)
    ));
    return Promise.all(arr);
}


// ROUNDS
function getAllRounds(hearingId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questionrounds/`, options);
}

function getRound(hearingId, roundId, options) {
    return generateRequest('GET', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questionrounds/${roundId}`, options);
}

function updateRoundToIssued(hearingId, roundId, options) {
    options.body = {state_name: 'question_issue_pending'};
    return generateRequest('PUT', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/questionrounds/${roundId}`, options);
}





// Format Rounds, Questions and Answers
function formatRounds(rounds) {
    return rounds.map(round => {
        let expireDate = round.question_references ? moment(getExpirationDate(round.question_references)) : null;
        let expires = null;
        if (expireDate) {
            const dateUtc = expireDate.utc().format();
            const date = expireDate.format('D MMM YYYY');
            const time = expireDate.format('HH:mma');
            expires = { dateUtc, date, time };
        }

        let numberQuestion = round.question_references ? round.question_references.length : 0;
        let numberQuestionAnswer = round.question_references ? countStates(round.question_references, 'question_answered') : 0;

        let questionDeadlineExpired = expireDate < moment();

        return {
            question_round_number: round.question_round_number,
            state: round.question_round_state.state_name,
            expires,
            number_question: numberQuestion,
            number_question_answer: numberQuestionAnswer,
            question_deadline_expired: questionDeadlineExpired,
            questions: round.question_references ? formatQuestions(round.question_references) : []
        }
    });
}


function countStates(questions, state) {
    return questions
        .map(question => question.current_question_state.state_name)
        .filter(s => s === state)
        .length
}

function getExpirationDate(questions) {
    return questions
        .map(question => question.deadline_expiry_date)
        .sort((a,b) =>new Date(b) - new Date(a))[0] || null;
}


function formatQuestions(questions) {
    return questions.map(question => {
        return {
            id: question.question_id,
            rounds: question.question_round,
            header: question.question_header_text,
            body: question.question_body_text,
            owner_reference: question.owner_reference,
            state_datetime: question.current_question_state.state_datetime,
            state: question.current_question_state.state_name
        }
    });
}

function formatQuestionRes(question, answers) {
    return {
        id: question.question_id,
        round: question.question_round,
        header: question.question_header_text,
        body: question.question_body_text,
        owner_reference: question.owner_reference,
        state_datetime: question.current_question_state.state_datetime,
        answer: (answers !== undefined && answers.length > 0 ? answers[0] : null)
    };
}

function formatQuestion(body, userId) {
    return {
        owner_reference: userId,
        question_body_text: body.question,
        question_header_text: body.subject,
        question_ordinal: '1',
        question_round: body.rounds,
        question_state: 'question_drafted'
    };
}

function formatAnswer(body) {
    if (body) {
        return {
            answer_text: body.text || 'foo bar',
            // answer_state: body.state || 'answer_drafted'
            answer_state: body.state || 'answer_submitted'
        };
    } else {
        return {
            answer_text: 'foo bar',
            // answer_state: 'answer_drafted'
            answer_state: 'answer_submitted'
        };
    }
}

function getAllQuestionsByCase(caseId, userId, options, jurisdiction) {
    return getHearingByCase(caseId, options)
        .then(hearing => hearing.online_hearings[0] ?
            hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, options, jurisdiction))
        .then(hearingId => getAllRounds(hearingId, options))
        .then(rounds => rounds && formatRounds(rounds.question_rounds));
}


function getOptions(req) {
    return {
        headers: {
            'Authorization': `Bearer ${req.auth.token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    };
}

module.exports = (app) => {
    const route = express.Router({mergeParams:true});
    app.use('/cases', route);

    // GET A Question
    route.get('/:case_id/questions/:question_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const questionId = req.params.question_id;
        const options = getOptions(req);

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => getQuestion(hearingId, questionId, options))
            .then(([question, answers]) => question && formatQuestionRes(question, answers))
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

    // GET ALL Questions
    route.get('/:case_id/questions', (req, res, next) => {
        const caseId = req.params.case_id;
        const userId = req.auth.userId;
        const options = getOptions(req);

        return getAllQuestionsByCase(caseId, userId, options, 'SSCS')
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

    // CREATE Question
    route.post('/:case_id/questions', (req, res, next) => {
        const caseId = req.params.case_id;
        const userId = req.auth.userId;
        const options = getOptions(req);

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0] ?
                hearing.online_hearings[0].online_hearing_id : postHearing(caseId, userId, options))
            .then(hearingId => postQuestion(hearingId, {...options, body: formatQuestion(req.body, userId)}))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(201).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });

    // UPDATE Question
    route.put('/:case_id/questions/:question_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const questionId = req.params.question_id;
        const userId = req.auth.userId;
        const options = getOptions(req);

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => putQuestion(hearingId, questionId, {...options, body: formatQuestion(req.body, userId)}))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });

    // DELETE A Question
    route.delete('/:case_id/questions/:question_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const questionId = req.params.question_id;
        const options = getOptions(req);

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

    // Submit Round
    route.put('/:case_id/rounds/:round_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const roundId = req.params.round_id;
        const options = getOptions(req);

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

    // Get a question round

    route.get('/:case_id/rounds', (req, res, next) => {
        const caseId = req.params.case_id;
        const options = getOptions(req);

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => getAllRounds(hearingId, options))
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

    route.get('/:case_id/rounds/:round_id', (req, res, next) => {
        const caseId = req.params.case_id;
        const roundId = req.params.round_id;
        const options = getOptions(req);

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId => getRound(hearingId, roundId, options))
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

    // Get a question round and answer
    route.get('/:case_id/rounds/:round_id/answer', (req, res, next) => {
        const caseId = req.params.case_id;
        const roundId = req.params.round_id;
        const options = getOptions(req);

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId =>
                getQuestions(hearingId, options)
                    .then(questions =>
                        questions.questions
                            .filter(q => q.question_round === roundId)
                            .filter(q => q.current_question_state.state_name === 'question_issued')
                            .map(q => q.question_id)
                    )
                    .then(questionIds => answerAllQuestions(hearingId, questionIds, options))
                    .then(response => {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('content-type', 'application/json');
                        res.status(200).send(JSON.stringify(response));
                    })
                    .catch(response => {
                        console.log(response.error || response);
                        res.status(response.error.status).send(response.error.message);
                    })
            )
    });

    // Get a question round and answer half
    route.get('/:case_id/rounds/:round_id/answerhalf', (req, res, next) => {
        const caseId = req.params.case_id;
        const roundId = req.params.round_id;
        const options = getOptions(req);

        return getHearingByCase(caseId, options)
            .then(hearing => hearing.online_hearings[0].online_hearing_id)
            .then(hearingId =>
                getQuestions(hearingId, options)
                    .then(questions =>
                        questions.questions
                            .filter(q => q.question_round === roundId)
                            .filter(q => q.current_question_state.state_name === 'question_issued')
                            .map(q => q.question_id)
                    )
                    .then(questionIds => answerAllQuestions(hearingId, questionIds, options))
                    .then(response => {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('content-type', 'application/json');
                        res.status(200).send(JSON.stringify(response));
                    })
                    .catch(response => {
                        console.log(response.error || response);
                        res.status(response.error.status).send(response.error.message);
                    })
            )
    });

};

module.exports.postHearing = postHearing;
module.exports.getAllQuestionsByCase = getAllQuestionsByCase;
