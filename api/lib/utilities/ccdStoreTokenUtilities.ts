import * as log4js from 'log4js'
import { config } from '../../../config'
import { DMDocument } from '../models'
import { asyncReturnOrError } from '../util'

const logger = log4js.getLogger('dm-store')
logger.level = config.logging || 'off'

const moment = require('moment')

const ccdStore = require('../../services/ccd-store-api/ccd-store')
const headerUtilities = require('./headerUtilities')

// TODO: PARKING WORK 4th December 2018, as it's been de-scoped, and is no longer a priority, for December 17th release.

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

export async function getTokenAndMakePayload(req, caseId, dmDocument: DMDocument) {
    console.log('getTokenAndMakePayload')

    const userId = req.auth.userId
    const comments = 'testing' // TODO: get from request once it's posted

    const jurisdiction = 'DIVORCE'
    const caseType = 'FinancialRemedyMVP2'
    const eventId = 'FR_uploadDocument'

    const eventTokenAndCase = await getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId)

    const eventToken = eventTokenAndCase.token

    const payload = prepareCaseForUpload(
        eventToken,
        eventId,
        dmDocument,
        comments
    )

    return await postCaseWithEventToken(userId, caseId, jurisdiction, caseType, payload)
}

export async function postCaseWithEventToken(userId, caseId, jurisdiction, caseType, payload) {

    console.log('postCaseWithEventToken')
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
        console.log('error')
        console.log(error.error)
        // TODO: Handle StatusCodeError: 422 - {"exception":"uk.gov.hmcts.ccd.endpoint.exceptions.ValidationException","timestamp":"2018-12-03T12:41:46.138","status":422,"error":"Unprocessable Entity","message":"The case status did not qualify for the event",

        // console.log('Error getting event token', exceptionFormatter(exception, exceptionOptions))
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

export function prepareCaseForUpload(eventToken, eventId, dmDocument: DMDocument, comments) {
    return {
        data: {
            uploadDocuments: [
                {
                    value: {
                        documentComment: comments,
                        // documentDateAdded: dmDocument.createdOn,
                        documentEmailContent: '',
                        documentFileName: dmDocument.originalDocumentName, // TODO: need this from form upload field if set
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
