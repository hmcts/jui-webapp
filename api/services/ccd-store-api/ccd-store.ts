import * as express from 'express'
import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { config } from '../../../config'
import { http } from '../../lib/http'
import { asyncReturnOrError } from '../../lib/util'


const logger = log4js.getLogger('ccd-store')
logger.level = config.logging || 'off'

const url = config.services.ccd_data_api

export async function getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId) {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/event-triggers/${eventId}/token`)

    return response.data
}

export async function getEventTokenAndCase(userId, jurisdiction, caseType, caseId, eventId) {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/event-triggers/${eventId}/token`)

    return { token: response.data.token, caseDetails: response.data.case_details }
}

export async function getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId, options) {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/event-triggers/${eventId}/token`)

    return response.data

}

// async version of postCCDEvent
export async function postCaseWithEventToken(userId, jurisdiction, caseTypeId, caseId, body) {
    const response = await http.post(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseTypeId}/cases/${caseId}/events`, body)

    return response.data
}

export async function postCCDEvent(userId, jurisdiction, caseType, caseId, body) {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/events`)

    return response.data
}

export async function getCCDCase(userId, jurisdiction, caseType, caseId) {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${
        jurisdiction}/case-types/${caseType}/cases/${caseId}`)

    return response.data
}

export async function getCCDEvents(userId, jurisdiction, caseType, caseId) {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/events`)

    return response.data
}

export async function getCCDCases(userId, jurisdiction, caseType, filter) {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${
        jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC${filter}`)

    return response.data
}

export async function postCCDCase(userId, jurisdiction, caseType, body) {
    const response = await http.post(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases`, body)

    return response.data
}

// TODO: This should eventually replace ccd better mutijud search
// jurisdictions is [{jur,caseType,filter},...]
export async function getMutiJudCCDCases(userId: string, jurisdictions: any[]) {

    const cases = await map(jurisdictions, async (jurisdiction: any) => {
        return await asyncReturnOrError(
            getCCDCases(userId, jurisdiction.jur, jurisdiction.caseType, jurisdiction.filter),
            `Error getting cases for ${jurisdiction.jur}`,
            null,
            logger,
            false)
    })

    return cases

}

export async function createCase(userId, jurisdiction, caseType, eventId, description, summary, data, options) {
    return getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId, options)
        .then(eventToken => {
            return {
                data,
                event: {
                    description,
                    id: eventId,
                    summary,
                },
                event_token: eventToken.token,
                ignore_warning: true,
            }
        })
        .then(obj => {
            console.dir(obj)
            return obj
        }) // use to debug case creation or update
        .then(body => postCCDCase(userId, jurisdiction, caseType, body))
}

export async function updateCase(userId, jurisdiction, caseType, caseId, eventId, description, summary, data, options) {
    return getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId)
        .then(eventToken => {
            return {
                data,
                event: {
                    description,
                    id: eventId,
                    summary,
                },
                event_token: eventToken.token,
                ignore_warning: true,
            }
        })
        .then(obj => {
            console.dir(obj)
            return obj
        }) // use to debug case creation or update
        .then(body => postCCDEvent(userId, jurisdiction, caseType, caseId, body))
}

export async function getHealth() {
    const response = await http.get( `${url}/health`)
    return response.data
}

export async function getInfo() {
    const response = await http.get( `${url}/info`)
    return response.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/ccd-store', router)

    router.get('/health', (req, res, next) => {
        res.status(200)
        res.send(getHealth())
    })

    router.get('/info', (req, res, next) => {
        res.status(200)
        res.send(getInfo())
    })
}
