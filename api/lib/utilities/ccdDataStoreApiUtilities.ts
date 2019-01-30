import * as log4js from 'log4js'
import {config} from '../../../config'
import {asyncReturnOrError} from '../util'
import {getEventTokenAndCase, postCaseWithEventToken} from '../../services/ccd-store-api/ccd-store'

const logger = log4js.getLogger('dm-store')
logger.level = config.logging || 'off'

const ERROR_UNABLE_TO_GET_EVENT_TOKEN = 'Unable to retrieve Event Token. Required to start event creation as a case worker.'
const ERROR_UNABLE_TO_POST_CASE = 'Unable to POST case data using the Event Token. Required to submit event creation as ' +
    'case worker.'

/**
 * getEventToken
 *
 * An Event Token is required to update a case. This token needs to be sent through in the payload to update a case.
 *
 * The following is a generic function to get the Event Token.
 *
 * @see /caseworkers/{uid}/jurisdictions/{jid}/case-types/{ctid}/cases/{cid}/event-triggers/{etid}/token
 * Which is used in the payload for:
 * @see /caseworkers/{uid}/jurisdictions/{jid}/case-types/{ctid}/cases/{cid}/events
 *
 * @param userId
 * @param caseId - '1548761902417900'
 * @param {String} jurisdiction ie. 'DIVORCE'
 * @param {String} caseType ie. 'FinancialRemedyMVP2'
 * @param {String} eventId ie. 'FR_uploadDocument'
 * @return {Promise}
 */
export async function getEventToken(userId, caseId, jurisdiction, caseType, eventId) {

    try {
        const eventToken = await getEventTokenAndCase(
            userId,
            jurisdiction,
            caseType,
            caseId,
            eventId
        )
        return eventToken.token
    } catch (error) {
        return Promise.reject({
            message: ERROR_UNABLE_TO_GET_EVENT_TOKEN,
            status: 500,
        })
    }
}

/**
 * postCase
 *
 * Update a case, using an event defined in the Case Defintions file.
 *
 * TODO: Currently there is a bug, where the CCD Data Store Api returns a 'Request failed with status code 404', this
 * is for an FR Divorce case. It does not occur initially when you create a new FR case.
 *
 * @param userId
 * @param caseId - '1548761902417900'
 * @param {String} jurisdiction ie. 'DIVORCE'
 * @param caseType
 * @param payload
 * @return {Promise}
 */
export async function postCase(userId, caseId, jurisdiction, caseType, payload) {

    const response = await asyncReturnOrError(
        postCaseWithEventToken(
            userId,
            jurisdiction,
            caseType,
            caseId,
            payload
        ),
        `Error sending event`,
        null,
        logger,
        false)

    if (!response) {
        return Promise.reject({
            message: ERROR_UNABLE_TO_POST_CASE,
            status: 500,
        })
    }
    return response
}

module.exports.getEventToken = getEventToken
module.exports.postCase = postCase
