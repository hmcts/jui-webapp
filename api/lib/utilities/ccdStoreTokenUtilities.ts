import * as log4js from 'log4js'
import {config} from '../../../config'
import {DMDocument} from '../models'
import {asyncReturnOrError} from '../util'

const logger = log4js.getLogger('dm-store')
logger.level = config.logging || 'off'

const moment = require('moment')
const ccdStore = require('../../services/ccd-store-api/ccd-store')

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
        const eventToken = await ccdStore.getEventTokenAndCase(
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
 * TODO: Currently there is a bug, where the Data Store Api returns a 'Request failed with status code 404', this
 * does not happen initially when you create an FR case. Therefore I think when a service line implements the
 * new uploadDocument within their case definitions file, this should work.
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

    if (!response) {
        return Promise.reject({
            message: ERROR_UNABLE_TO_POST_CASE,
            status: 500,
        })
    }
    return response
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

module.exports.getEventToken = getEventToken
module.exports.postCase = postCase
module.exports.prepareCaseForApproval = prepareCaseForApproval
module.exports.prepareCaseForUploadFR = prepareCaseForUploadFR
