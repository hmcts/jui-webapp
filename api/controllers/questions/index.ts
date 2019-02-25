import * as express from 'express'
import {asyncReturnOrError, judgeLookUp} from '../../lib/util'
import * as cohCor from '../../services/cohQA'
import * as log4jui from '../../lib/log4jui'

const moment = require('moment')

import * as headerUtilities from '../../lib/utilities/headerUtilities'
import {getHearingByCase} from "../../services/cohQA"

const logger = log4jui.getLogger('questions')

// Create a new hearing
export async function createHearing(caseId, userId, options, jurisdiction = 'SSCS') {
    options.body = {
        case_id: caseId,
        jurisdiction,
        panel: [{identity_token: 'string', name: userId}],
        start_date: new Date().toISOString()
    }

    const r1 = await cohCor.postHearing(options)
    return r1.online_hearing_id
}

export function getQuestion(hearingId, questionId, options) {
    return [cohCor.getQuestion(hearingId, questionId, options), cohCor.getAnswers(hearingId, questionId)]
}

export function answerAllQuestions(hearingId, questionIds) {
    const arr = []
    questionIds.forEach(id => arr.push(cohCor.postAnswer(hearingId, id, formatAnswer())))
    return arr
}

export function updateRoundToIssued(hearingId, roundId, options) {
    return cohCor.putRound(hearingId, roundId, {state_name: 'question_issue_pending'})
}

// Format Rounds, Questions and Answers
export function formatRounds(rounds) {
    return rounds.map(round => {
        const expireDate = round.question_references ? moment(getExpirationDate(round.question_references)) : null
        let expires = null
        if (expireDate) {
            const dateUtc = expireDate.utc().format()
            const date = expireDate.format('D MMM YYYY')
            const time = expireDate.format('HH:mma')
            expires = {dateUtc, date, time}
        }

        const numberQuestion = round.question_references ? round.question_references.length : 0
        const numberQuestionAnswer = round.question_references ? countStates(round.question_references, 'question_answered') : 0

        const questionDeadlineExpired = expireDate < moment()

        return {
            question_round_number: round.question_round_number,
            state: round.question_round_state.state_name,
            expires,
            number_question: numberQuestion,
            number_question_answer: numberQuestionAnswer,
            question_deadline_expired: questionDeadlineExpired,
            deadline_extension_count: round.deadline_extension_count,
            questions: round.question_references ? formatQuestions(round.question_references) : []
        }
    })
}

export function countStates(questions, state) {
    return questions.map(question => question.current_question_state.state_name).filter(s => s === state).length
}

export function getExpirationDate(questions) {
    return (
        questions.map(question => question.deadline_expiry_date)
            .sort((a, b) => (new Date(b) as any) - (new Date(a) as any))[0] || null
    )
}

export function formatQuestions(questions) {
    return questions.map(question => {
        return {
            id: question.question_id,
            rounds: question.question_round,
            header: question.question_header_text,
            body: question.question_body_text,
            owner_reference: judgeLookUp(question.owner_reference),
            state_datetime: question.current_question_state.state_datetime,
            state: question.current_question_state.state_name
        }
    })
}

export function formatQuestionRes(question, answers) {
    return {
        id: question.question_id,
        round: question.question_round,
        header: question.question_header_text,
        body: question.question_body_text,
        owner_reference: judgeLookUp(question.owner_reference),
        state_name: question.current_question_state.state_name,
        state_datetime: question.current_question_state.state_datetime,
        answer: answers !== undefined && answers.length > 0 ? answers[0] : null,
    }
}

export function formatQuestion(body: any, email: string) {
    return {
        owner_reference: email,
        question_body_text: body.question,
        question_header_text: body.subject,
        question_ordinal: '1',
        question_round: body.rounds,
        question_state: 'question_drafted',
    }
}

export function formatAnswer(body = null) {
    if (body) {
        return {
            answer_state: body.state || 'answer_submitted',
            answer_text: body.text || 'foo bar',
        }
    }
    return {
        answer_state: 'answer_submitted',
        answer_text: 'foo bar',
    }
}

export async function getAllQuestionsByCase(caseId, userId, jurisdiction) {
    const r1 = await asyncReturnOrError(getHearingByCase(caseId), 'Error getting hearing by case.', null, logger)
    const r2 = r1.online_hearings[0] ? r1.online_hearings[0].online_hearing_id : createHearing(caseId, userId, jurisdiction)
    const r3 = await asyncReturnOrError(cohCor.getAllRounds(r2), 'Error getting question rounds.', null, logger)
    return r3 && formatRounds(r3.question_rounds)
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

export async function questionHandler(req, res) {
    const caseId = req.params.case_id
    const questionId = req.params.question_id
    const options = getOptions(req)

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId => getQuestion(hearingId, questionId, options))
        .then(([question, answers]) => question && formatQuestionRes(question, answers))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function questionsHandler(req, res) {
    const caseId = req.params.case_id
    const userId = req.auth.userId
    const options = getOptions(req)

    return getAllQuestionsByCase(caseId, userId, 'SSCS')
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function postQuestionsHandler(req, res) {
    const caseId = req.params.case_id

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing =>
            hearing.online_hearings[0]
                ? hearing.online_hearings[0].online_hearing_id
                : cohCor.createHearing(caseId)
        )
        .then(hearingId => cohCor.postQuestion(hearingId, formatQuestion(req.body, req.session.user.email)))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(201).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function putQuestionsHandler(req, res) {
    const caseId = req.params.case_id
    const questionId = req.params.question_id

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId => cohCor.putQuestion(hearingId, questionId, formatQuestion(req.body, req.session.user.email)))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function deleteQuestionsHandler(req, res) {
    const caseId = req.params.case_id
    const questionId = req.params.question_id

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId => cohCor.deleteQuestion(hearingId, questionId))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function putRounds(req, res) {
    const caseId = req.params.case_id
    const roundId = req.params.round_id
    const options = getOptions(req)

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId => updateRoundToIssued(hearingId, roundId, options))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function getRounds(req, res) {
    const caseId = req.params.case_id
    const options = getOptions(req)

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId => cohCor.getAllRounds(hearingId))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function getRoundById(req, res) {
    const caseId = req.params.case_id
    const roundId = req.params.round_id

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId => cohCor.getRound(hearingId, roundId))
        .then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(response))
        })
        .catch(response => {
            console.log(response.error || response)
            res.status(response.error.status).send(response.error.message)
        })
}

export function getRoundAndAnswer(req, res) {
    const caseId = req.params.case_id
    const roundId = req.params.round_id

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId =>
            cohCor
                .getQuestions(hearingId)
                .then(questions =>
                    questions.questions
                        .filter(q => q.question_round === roundId)
                        .filter(q => q.current_question_state.state_name === 'question_issued')
                        .map(q => q.question_id)
                )
                .then(questionIds => answerAllQuestions(hearingId, questionIds))
                .then(response => {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    res.setHeader('content-type', 'application/json')
                    res.status(200).send(JSON.stringify(response))
                })
                .catch(response => {
                    console.log(response.error || response)
                    res.status(response.error.status).send(response.error.message)
                })
        )
}

export function getRoundAndHalfAnswer(req, res) {
    const caseId = req.params.case_id
    const roundId = req.params.round_id

    return cohCor
        .getHearingByCase(caseId)
        .then(hearing => hearing.online_hearings[0].online_hearing_id)
        .then(hearingId =>
            cohCor
                .getQuestions(hearingId)
                .then(questions =>
                    questions.questions
                        .filter(q => q.question_round === roundId)
                        .filter(q => q.current_question_state.state_name === 'question_issued')
                        .map(q => q.question_id)
                )
                .then(questionIds => answerAllQuestions(hearingId, questionIds))
                .then(response => {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    res.setHeader('content-type', 'application/json')
                    res.status(200).send(JSON.stringify(response))
                })
                .catch(response => {
                    console.log(response.error || response)
                    res.status(response.error.status).send(response.error.message)
                })
        )
}

export default app => {
    const route = express.Router({mergeParams: true})
    // TODO: we need to put this back to '/case' in the future (rather than '/caseQ') when it doesn't clash with case/index.js
    app.use('/caseQ', route)

    // GET A Question
    route.get('/:case_id/questions/:question_id', async (req, res, next) => {
        await questionHandler(req, res)
    })

    // GET ALL Questions
    route.get('/:case_id/questions', async (req: any, res, next) => {
        await questionsHandler(req, res)
    })

    // CREATE Question
    route.post('/:case_id/questions', async (req: any, res, next) => {
        await postQuestionsHandler(req, res)
    })

    // UPDATE Question
    route.put('/:case_id/questions/:question_id', async (req: any, res, next) => {
        await putQuestionsHandler(req, res)
    })

    // DELETE A Question
    route.delete('/:case_id/questions/:question_id', async (req, res, next) => {
        await deleteQuestionsHandler(req, res)
    })

    // Submit Round
    route.put('/:case_id/rounds/:round_id', async (req, res, next) => {
        await putRounds(req, res)
    })

    // Get a question round

    route.get('/:case_id/rounds', async (req, res, next) => {
        await getRounds(req, res)
    })

    route.get('/:case_id/rounds/:round_id', async (req, res, next) => {
        await getRoundById(req, res)
    })

    // Get a question round and answer
    route.get('/:case_id/rounds/:round_id/answer', async (req, res, next) => {
        await getRoundAndAnswer(req, res)
    })

    // Get a question round and answer half
    route.get('/:case_id/rounds/:round_id/answerhalf', async (req, res, next) => {
        await getRoundAndHalfAnswer(req, res)
    })
}
