import * as log4js from 'log4js'
import {config} from '../../../config'
import {DMDocument} from '../models'
import {asyncReturnOrError} from '../util'

const logger = log4js.getLogger('dm-store')
logger.level = config.logging || 'off'

const moment = require('moment')

const ccdStore = require('../../services/ccd-store-api/ccd-store')
const headerUtilities = require('./headerUtilities')

// TODO: PARKING WORK 4th December 2018, as it's been de-scoped, and is no longer a priority, for December 17th release.

const ERROR_UNABLE_TO_GET_TOKEN = 'Unable to retrieve token required to start event creation as a case worker'

/**
 * getOptions
 *
 * TODO: This shouldn't need to be here.
 * @param req
 * @return {*|{headers}}
 */
function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

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
        // TODO: rename to getEventToken
        const eventToken = await getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId)
        return eventToken.token
    } catch (error) {
        return Promise.reject({
            message: ERROR_UNABLE_TO_GET_TOKEN,
            status: 500,
        })
    }
}

// TODO: Think if fileNotes should be metadata to keep this generic.
export async function getTokenAndMakePayload(userId, caseId, jurisdiction, caseType, eventId, fileNotes,
                                             dmDocument: DMDocument) {
    console.log('getTokenAndMakePayload')

    // let eventToken = ''
    //
    // try {
    //     const eventTokenAndCase = await getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId)
    //     eventToken = eventTokenAndCase.token
    // } catch (error) {
    //     return Promise.reject({
    //         message: ERROR_UNABLE_TO_GET_TOKEN,
    //         status: 500,
    //     })
    // }

    // console.log('eventToken')
    // console.log(eventToken)
    //
    // // TODO: This should be in the file
    // const payload = prepareCaseForUploadFR(
    //     eventToken,
    //     eventId,
    //     dmDocument,
    //     fileNotes
    // )
    //
    // return await postCaseWithEventToken(userId, caseId, jurisdiction, caseType, payload)
}

/**
 * postCaseWithEventToken
 *
 * @param userId
 * @param caseId
 * @param jurisdiction
 * @param caseType
 * @param payload
 * @return {Promise<any>}
 */
export async function postCaseWithEventToken(userId, caseId, jurisdiction, caseType, payload) {

    const response = await asyncReturnOrError(
        ccdStore.postCaseWithEventToken(
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
    return response
}

/**
 * getEventTokenAndCase
 *
 * TODO: Not sure if we need both Authorization and ServiceAuthorization on this request.
 * TODO: Error handling passing back meaningful error.
 * TODO: Unit Test
 *
 * @param {String} userId - '96842'
 * @param {String} caseId - '1540909451019845'
 * @param {String} jurisdiction - 'DIVORCE'
 * @param {String} caseType - 'FinancialRemedyMVP2'
 * @param {String} eventId - 'FR_approveApplication'
 * @return {Promise.<*>}
 */
async function getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId) {
    console.log('getEventTokenAndCase')
    try {
        const eventTokenAndCase = await ccdStore.getEventTokenAndCase(
            userId,
            jurisdiction,
            caseType,
            caseId,
            eventId
        )
        return eventTokenAndCase
    } catch (error) {
        return error
    }
}

/**
 * perpareCaseForApproval
 *
 * TODO: Make DRY with state.js
 * TODO: Unit Test
 * TODO: directionComments used to be store.get(`decisions_${state.inCaseId} store.notesForAdmin
 *
 * @param eventToken
 * @param {String} eventId - 'FR_approveApplication'
 * @param {String} directionComments - the comments that go along with the
 *
 * @return {Object} -
 * {
 *  data:
 *  {
 *  orderDirection: 'Order Accepted as drafted',
 *  orderDirectionDate: '2018-12-03',
 *  orderDirectionJudge: 'District Judge',
 *  orderDirectionJudgeName: 'Nasim Judge '
 *  },
 *  event: { id: 'FR_approveApplication' },
 *  event_token: 'eyJhbG...',
 *  ignore_warning: true
 * }
 */
function prepareCaseForApproval(eventToken, eventId, user, directionComments) {
    return {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderDirection: 'Order Accepted as drafted',
            orderDirectionAddComments: directionComments,
            orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
            orderDirectionJudge: 'District Judge',
            orderDirectionJudgeName: `${user.forename} ${user.surname} `
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }
}

/**
 * prepareCaseForUpload
 *
 * @param eventToken
 * @param eventId
 * @param dmDocument
 * @param comments
 * @return
 */
export function prepareCaseForUpload(eventToken, eventId, dmDocument: DMDocument, comments) {

    return {
        data: {
            uploadDocuments: [
                {
                    value: {
                        documentName: dmDocument.originalDocumentName,
                        documentType: 'Letter',
                        createdBy: dmDocument.createdBy,
                        createdDate: '2019-01-29',
                        createdTime: '12:32:14+0000',
                        authoredDate: dmDocument.modifiedOn,
                        //TBC
                        documentComment: comments,
                        documentEmailContent: 'juitestuser2@gmail.com',
                        documentLink: {
                            document_url: dmDocument._links.self.href,
                        },
                    },
                },
            ],
        },
        event: {
            id: eventId,
        },
        event_token: eventToken,

        ignore_warning: true,
    }
}

/**
 * prepareCaseForUploadFR
 *
 * This works and returns a Success 200 when hitting jurisdiction: 'DIVORCE', caseType: 'FinancialRemedyMVP2',
 * eventId: 'FR_uploadDocument'.
 *
 * Bug: If you successfully POST to /caseworkers/{uid}/jurisdictions/{jid}/case-types/{ctid}/cases/{cid}/events,
 * all subsequent events return a 404. I'm hoping that when FR implement uploadDocument with the new complexTypes,
 * this issue is resolved.
 *
 * TODO: Deprecate this function once all service lines are using the new Upload document feature within their case
 * definitions file.
 *
 * @param eventToken - Token returned from the call to 'Start event creation as Case worker' as per Core Case Data
 * - Data store API docs.
 * @param eventId - 'FR_uploadDocument'
 * @param dmDocument
 * @param comments
 * @return {}
 */
export function prepareCaseForUploadFR(eventToken, eventId, dmDocument: DMDocument, comments) {

    console.log('dmDocument')
    console.log(dmDocument)

    return {
        data: {
            uploadDocuments: [
                {
                    value: {
                        documentComment: comments,
                        documentDateAdded: '2019-01-29',
                        documentEmailContent: 'juitestuser2@gmail.com',
                        documentFileName: dmDocument.originalDocumentName,
                        documentLink: {
                            document_url: dmDocument._links.self.href,
                        },
                        documentType: 'Other',
                    },
                },
            ],
        },
        event: {
            id: eventId,
        },
        event_token: eventToken,

        ignore_warning: true,
    }
}

module.exports.getTokenAndMakePayload = getTokenAndMakePayload
module.exports.getEventTokenAndCase = getEventTokenAndCase
module.exports.prepareCaseForApproval = prepareCaseForApproval

module.exports.postCaseWithEventToken = postCaseWithEventToken
module.exports.prepareCaseForUploadFR = prepareCaseForUploadFR
module.exports.getEventToken = getEventToken
