import * as express from 'express'
import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { config } from '../../../config'
import { http } from '../../lib/http'
import { CCDEventResponse } from '../../lib/models'
import { asyncReturnOrError } from '../../lib/util'

const logger = log4js.getLogger('ccd-store')
logger.level = config.logging || 'off'

const url = config.services.ccd_data_api

export async function getCCDEventToken(
    userId: string, jurisdiction: string, caseType: string, caseId: string, eventId: string): Promise<any> {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/event-triggers/${eventId}/token`)

    return response.data
}

export async function getEventTokenAndCase(
    userId: string, jurisdiction: string,caseType: string, caseId: string, eventId: string): Promise<CCDEventResponse> {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/event-triggers/${eventId}/token`)

    return { token: response.data.token, caseDetails: response.data.case_details }
}

export async function getCCDEventTokenWithoutCase(
    userId: string, jurisdiction: string, caseType: string, eventId: string): Promise<any> {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/event-triggers/${eventId}/token`)

    return response.data

}

export async function postCaseWithEventToken(
    userId: string, jurisdiction: string, caseTypeId: string, caseId: string, body: any): Promise<any> {
    const response = await http.post(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseTypeId}/cases/${caseId}/events`, body)

    return response.data
}

export async function postCCDEvent(
    userId: string, jurisdiction: string, caseType: string, caseId: string, body: any): Promise<any> {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/events`)

    return response.data
}

export async function getCCDCase(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${
        jurisdiction}/case-types/${caseType}/cases/${caseId}`)

    return response.data
}

export async function getCCDEvents(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases/${caseId}/events`)

    return response.data
}

export async function getCCDCases(userId: string, jurisdiction: string, caseType: string, filter: string): Promise<any> {
    const response = await http.get(`${url}/caseworkers/${userId}/jurisdictions/${
        jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC${filter}`)

    return response.data
}

export async function postCCDCase(userId: string, jurisdiction: string, caseType: string, body: any): Promise<any> {
    const response = await http.post(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${
        caseType}/cases`, body)

    return response.data
}

export async function getMutiJudCCDCases(userId: string, jurisdictions: any[]): Promise<any[]> {

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

export async function createCase(
    userId: string, jurisdiction: string, caseType: string, eventId: string,
    description: string, summary: string, data: any): Promise<any> {
    return getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId)
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
            return obj
        }) // use to debug case creation or update
        .then(body => postCCDCase(userId, jurisdiction, caseType, body))
}

export async function updateCase(
    userId: string, jurisdiction: string, caseType: string,
    caseId: string, eventId: string, description: string, summary: string, data: any): Promise<any> {
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
            return obj
        }) // use to debug case creation or update
        .then(body => postCCDEvent(userId, jurisdiction, caseType, caseId, body))
}

export async function getHealth(): Promise<any> {
    const response = await http.get( `${url}/health`)
    return response.data
}

export async function getInfo(): Promise<any> {
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
