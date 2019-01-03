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

export async function getTokenAndMakePayload(req, caseId) {

    const authHeaders = getOptions(req)

    console.log('getTokenAndMakePayload')

    const user = req.session.user
    const userId = req.auth.userId

    const jurisdiction = 'DIVORCE'
    const caseType = 'FinancialRemedyMVP2'
    const eventId = 'FR_approveApplication'

    const eventTokenAndCase = await getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId, authHeaders)

    console.log('eventTokenAndCase')
    console.log(eventTokenAndCase)

    const eventToken = eventTokenAndCase.token
    const caseDetails = eventTokenAndCase.caseDetails

    const directionComments = ''
    // console.log(eventToken);
    // console.log(caseDetails);

    console.log('eventToken going in ')
    console.log(eventToken)
    console.log('caseDetails', JSON.stringify(caseDetails, null, 2))

    // const payload = prepareCaseForApproval(
    //     eventToken,
    //     eventId,
    //     user,
    //     directionComments
    // )
    //
    // console.log('payload')
    // console.log(payload)
    //
    // const caseWithEventToken = await postCaseWithEventToken(userId, caseId, jurisdiction, caseType, payload,
    //                             authHeaders)
    //
    // console.log('caseWithEventToken')
    // console.log(caseWithEventToken)

    // console.log(eventToken)
    // console.log(caseDetails)
}

export async function postCaseWithEventToken(userId, caseId, jurisdiction, caseType, payload, authHeaders) {

    try {
        console.log('Payload assembled')
        console.log(JSON.stringify(payload))
        const caseWithEventToken = await ccdStore.postCaseWithEventToken(
            userId,
            jurisdiction,
            caseType,
            caseId,
            payload,
            authHeaders
        )

        return caseWithEventToken
    } catch (error) {
        console.log('Error sending event')
        console.log(error)
    }
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
 * @param {Object} authHeaders - { Authorization: 'Bearer eyJhb...', ServiceAuthorization: 'eyJhb...' }
 * @return {Promise.<*>}
 */
async function getEventTokenAndCase(userId, caseId, jurisdiction, caseType, eventId, authHeaders) {
    console.log('getEventTokenAndCase')
    console.log(userId)
    console.log(caseId)
    console.log(jurisdiction)
    console.log(caseType)
    console.log(eventId)
    console.log(authHeaders)
    try {
        const eventTokenAndCase = await ccdStore.getEventTokenAndCase(
            userId,
            jurisdiction,
            caseType,
            caseId,
            eventId,
            authHeaders
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
            orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
            orderDirectionJudge: 'District Judge',
            orderDirectionJudgeName: `${user.forename} ${user.surname} `,
            orderDirectionAddComments: directionComments
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }
}

module.exports.getTokenAndMakePayload = getTokenAndMakePayload
module.exports.getEventTokenAndCase = getEventTokenAndCase
module.exports.prepareCaseForApproval = prepareCaseForApproval
