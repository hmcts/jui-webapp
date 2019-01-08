import * as express from 'express'
import {config} from '../../../config'
import { http } from '../../lib/http'

const url = config.services.coh_cor_api

// Hearings
export async function getHearing(hearingId) {
    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}`)
    return response.data
}

// TODO: this need to know it if getting mutiple or single cases lists
export async function getHearingByCase(caseId) {
    const response = await http.get(`${url}/continuous-online-hearings?case_id=${caseId}`)

    return response.data

}

// Questions
export async function getQuestions(hearingId) {
    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}/questions`)

    return response.data
}

export async function postQuestion(hearingId, body) {
    const response = await http.post(`${url}/continuous-online-hearings/${hearingId}/questions`, body)

    return response.data
}

export async function getQuestion(hearingId, questionId, options) {
    const response = await http.get( `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}`, options)

    return response.data
}

export async function putQuestion(hearingId, questionId, body) {
    const response = await http.put(`${url}/continuous-online-hearings/${hearingId}/questions/${questionId}`, body)
}

export async function deleteQuestion(hearingId, questionId) {
    const response = await http.delete(`${url}/continuous-online-hearings/${hearingId}/questions/${questionId}`)
    return response.data
}

// Answer
export async function getAnswers(hearingId, questionId) {
    const response = await http.get( `${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`)
    return response.data
}

export async function postAnswer(hearingId, questionId, body) {
    const response = await http.post(`${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers`, body)

    return response.data
}

export async function getAnswer(hearingId, questionId, answerId) {
    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers${answerId}`)

    return response.data
}

export async function putAnswer(hearingId, questionId, answerId, body) {
    const response = http.put(`${url}/continuous-online-hearings/${hearingId}/questions/${questionId}/answers${answerId}`, body)
}

// ROUNDS
export async function getAllRounds(hearingId) {
    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}/questionrounds/`)
    return response.data
}

export async function getRound(hearingId, roundId) {
    const response = await  http.get( `${url}/continuous-online-hearings/${hearingId}/questionrounds/${roundId}`)
    return response.data
}

export async function putRound(hearingId, roundId, body) {
    const response = await http.put(`${url}/continuous-online-hearings/${hearingId}/questionrounds/${roundId}`, body)
    return response.data
}

// Converation (COH Events)
export async function getOnlineHearingConversation(onlineHearingId) {
    const response = await http.get(`${url}/continuous-online-hearings/${onlineHearingId}/conversations`)
    return response.data
}

// Decision
export async function postDecision(hearingId, body) {
    const response = await http.post(`${url}/continuous-online-hearings/${hearingId}/decisions`,  body )
    return response.data
}

export async function putDecision(hearingId, body) {
    const response = await http.put(`${config.services.coh_cor_api}/continuous-online-hearings/${hearingId}/decisions`,  body )
    return response.data
}

export async function getDecision(hearingId) {
    const response = await http.get( `${url}/continuous-online-hearings/${hearingId}/decisions`)
    return response.data
}

// Special ones (may not need to be here could be high up business logic)
export async function createHearing(caseId, userId, jurisdictionId = 'SSCS') {
    const body = {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: (new Date()).toISOString(),
    }

    const response = await http.post(`${url}/continuous-online-hearings`)
    return response.data.online_hearing_id
}

export async function getHearingIdOrCreateHearing(caseId, userId) {
    const hearing: any = await getHearingByCase(caseId)
    return  hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : createHearing(caseId, userId)
}

export async function postHearing(body) {
    const response = await http.post(`${url}/continuous-online-hearings`, body)
    return response.data
}

export async function getHealth() {
    const response = await http.get(`${url}/health`)
    return response.data
}

export async function getInfo() {
    const response = await http.get(`${url}/info`)
    return response.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/coh-cor', router)

    router.get('/health', (req, res, next) => {
        res.status(200)
        res.send(getHealth())
    })

    router.get('/info', (req, res, next) => {
        res.status(200)
        res.send(getInfo())
    })
}
