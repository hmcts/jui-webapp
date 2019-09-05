import * as express from 'express'
import { map } from 'p-iteration'
import { config } from '../../../config'
import { http } from '../../lib/http'
import * as log4jui from '../../lib/log4jui'
import { CCDEventResponse } from '../../lib/models'
import { asyncReturnOrError, getHealth, getInfo } from '../../lib/util'
import { ERROR_UNABLE_TO_GET_CASES_FOR_JURISDICTION } from '../../lib/errors'
import {ERROR_UNABLE_TO_RELIST_HEARING} from '../../lib/config/cohConstants';

const logger = log4jui.getLogger('ccd-store')

const url = config.services.ccd_data_api

export async function getCCDEventToken(userId: string,
    jurisdiction: string,
    caseType: string,
    caseId: string,
    eventId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`
    )

    return response.data
}

export async function getEventTokenAndCase(userId: string,
    jurisdiction: string,
    caseType: string,
    caseId: string,
    eventId: string): Promise<CCDEventResponse> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`
    )

    return { token: response.data.token, caseDetails: response.data.case_details }
}

export async function getCCDEventTokenWithoutCase(userId: string,
    jurisdiction: string,
    caseType: string,
    eventId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/event-triggers/${eventId}/token`
    )

    return response.data
}

export async function postCaseWithEventToken(userId: string, jurisdiction: string, caseTypeId: string, caseId: string, body: any): Promise<any> {

    const response = await http.post(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseTypeId}/cases/${caseId}/events`,
        body
    )

    return response.data
}

export async function postCCDEvent(userId: string, jurisdiction: string, caseType: string, caseId: string, body: any): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    )

    return response.data
}

export async function getCCDCase(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`
    )

    return response.data
}

export async function getCCDEvents(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    )

    return response.data
}

/**
 * getCCDCases
 *
 * @param {string} userId
 * @param {string} jurisdiction
 * @param {string} caseType
 * @param {string} filter
 * @param requestCcdPage - We request the page number from CCD as CCD paginate all Case requests to a maximum of 25 within their ccd-store-api service.
 * @returns {Promise<any>}
 */
export async function getCCDCases(userId: string, jurisdiction: string, caseType: string, filter: string, requestCcdPage = 0): Promise<any> {

    const response = await http.get(
        `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC${filter}&page=${requestCcdPage}`
    )
    return response.data
}

/**
 * getCasesPaginationMetadata
 *
 * Gets the Cases Pagination Metadata.
 *
 * @param {string} userId - 510003
 * @param {string} jurisdiction - 'SSCS'
 * @param {string} caseType - 'Benefit'
 * @returns {Promise<any>}
 */
export async function getCasesPaginationMetadata(userId: string, jurisdiction: string, caseType: string, filter: string): Promise<any> {

    const paginationUrl = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/pagination_metadata?sortDirection=DESC${filter}`

    try {
        const paginationMetadata = await http.get(paginationUrl)
        return paginationMetadata.data
    } catch (error) {
        return Promise.reject({
            message: 'Error unable to return pagination metadata',
            serviceError: {
                message: error.response.data,
                status: error.response.status,
            },
        })
    }
}

/**
 * getMultiplyCasesPaginationMetadata
 *
 * There could be multiple pagination results for a Users with mulitple filters.
 *
 * We need to iterate through these pagination results.
 *
 * @param {string} userId
 * @param {any[]} jurisdictions
 * @returns {Promise<any>}
 */
export async function getMultiplyCasesPaginationMetadata(userId: string, jurisdictions: any[]): Promise<any> {

    const paginationMetadataMultiplyCaseSets = await map(jurisdictions, async (jurisdiction: any) => {
        return getCasesPaginationMetadata(userId, jurisdiction.jur, jurisdiction.caseType, jurisdiction.filter)
    })

    return paginationMetadataMultiplyCaseSets
}

export async function postCCDCase(userId: string, jurisdiction: string, caseType: string, body: any): Promise<any> {
    const response = await http.post(`${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases`, body)
}

/**
 * getMutiJudCCDCases
 *
 * @param {string} userId
 * @param {any[]} jurisdictions
 * @param {number} requestCcdPage - is set as 0 as default as it's currently being called in multiply places.
 * @returns {Promise<any[]>}
 */
export async function getMutiJudCCDCases(userId: string, jurisdictions: any[], requestCcdPage): Promise<any[]> {

    const cases = await map(jurisdictions, async (jurisdiction: any) => {

        return await asyncReturnOrError(
            getCCDCases(userId, jurisdiction.jur, jurisdiction.caseType, jurisdiction.filter, requestCcdPage),
            ERROR_UNABLE_TO_GET_CASES_FOR_JURISDICTION.humanStatusCode + jurisdiction.jur,
            null,
            logger,
            false
        )
    })

    return [[].concat(...cases)]
}

export async function createCase(userId: string,
    jurisdiction: string,
    caseType: string,
    eventId: string,
    description: string,
    summary: string,
    data: any): Promise<any> {
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

export async function updateCase(userId: string,
    jurisdiction: string,
    caseType: string,
    caseId: string,
    eventId: string,
    description: string,
    summary: string,
    data: any): Promise<any> {
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



export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/ccd-store', router)

    router.get('/health', (req, res, next) => {
        res.status(200)
        res.send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200)
        res.send(getInfo(url))
    })
}
