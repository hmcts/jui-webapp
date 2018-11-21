const express = require('express')
const config = require('../../../config')
const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.coh_cor_api

// Hearings
function getHearing(hearingId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${hearingId}`, options)
}

// TODO: this need to know it if getting mutiple or single cases lists
function getHearingByCase(caseId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings?case_id=${caseId}`, options)
}

function postHearing(options) {
    return generateRequest('POST', `${url}/continuous-online-hearings`, options)
}

// Questions
function getQuestions(hearingId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${hearingId}/questions`, options)
}

function postQuestion(hearingId, options) {
    return generateRequest('POST', `${url}/continuous-online-hearings/${hearingId}/questions`, options)
}

function getQuestion(hearingId, questionId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options)
}

function putQuestion(hearingId, questionId, options) {
    return generateRequest('PUT', `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options)
}

function deleteQuestion(hearingId, questionId, options) {
    return generateRequest('DELETE', `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options)
}

// Answer
function getAnswers(hearingId, questionId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`, options)
}

function postAnswer(hearingId, questionId, options) {
    return generateRequest('POST', `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`, options)
}

function getAnswer(hearingId, questionId, answerId, options) {
    return generateRequest('POST', `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers${answerId}`, options)
}

function putAnswer(hearingId, questionId, answerId, options) {
    return generateRequest('PUT', `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers${answerId}`, options)
}

// ROUNDS
function getAllRounds(hearingId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${hearingId}/questionrounds/`, options)
}

function getRound(hearingId, roundId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${hearingId}/questionrounds/${roundId}`, options)
}

function putRound(hearingId, roundId, options) {
    return generateRequest('PUT', `${url}/continuous-online-hearings/${hearingId}/questionrounds/${roundId}`, options)
}

// Converation (COH Events)
function getOnlineHearingConversation(onlineHearingId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${onlineHearingId}/conversations`, options)
}

// Decision
function postDecision(hearingId, options, body) {
    return generateRequest('POST', `${url}/continuous-online-hearings/${hearingId}/decisions`, { options, body })
}

function putDecision(hearingId, options, body) {
    return generateRequest('PUT', `${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/decisions`, { options, body })
}

function getDecision(hearingId, options) {
    return generateRequest('GET', `${url}/continuous-online-hearings/${hearingId}/decisions`, { options })
}

// Special ones (may not need to be here could be high up business logic)
function createHearing(caseId, userId, options, jurisdictionId = 'SSCS') {
    options.body = {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: (new Date()).toISOString()
    }

    return postHearing(options).then(hearing => hearing.online_hearing_id)
}

function getHearingIdOrCreateHearing(caseId, userId, options) {
    return getHearingByCase(caseId, options)
        .then(h => h.online_hearings[0] ? h.online_hearings[0].online_hearing_id : createHearing(caseId, userId, options))
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/coh-cor', router)

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })
}

module.exports.getInfo = getInfo

module.exports.getHealth = getHealth

// Hearings
module.exports.getHearing = getHearing

module.exports.getHearingByCase = getHearingByCase

module.exports.postHearing = postHearing

// Questions
module.exports.getQuestions = getQuestions

module.exports.getQuestion = getQuestion

module.exports.postQuestion = postQuestion

module.exports.putQuestion = putQuestion

module.exports.deleteQuestion = deleteQuestion

// Answers
module.exports.getAnswers = getAnswers

module.exports.postAnswer = postAnswer

module.exports.getAnswer = getAnswer

module.exports.putAnswer = putAnswer

// ROUNDS
module.exports.getAllRounds = getAllRounds

module.exports.getRound = getRound

module.exports.putRound = putRound

// Converation (COH Events)
module.exports.getOnlineHearingConversation = getOnlineHearingConversation

// Decision
module.exports.getDecision = getDecision

module.exports.postDecision = postDecision

module.exports.putDecision = putDecision

// Special ones
module.exports.createHearing = createHearing

module.exports.getHearingIdOrCreateHearing = getHearingIdOrCreateHearing
