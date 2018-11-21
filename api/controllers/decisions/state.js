const Store = require('../../lib/store/store')
const exceptionFormatter = require('exception-formatter')
const config = require('../../../config/index')
const ccdStore = require('../../services/ccd-store-api/ccd-store')
const express = require('express')
const moment = require('moment')
const stateMeta = require('./state_meta')
const translateJson = require('./translate')
const log4js = require('log4js')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const logger = log4js.getLogger('State')
logger.level = config.logging ? config.logging : 'OFF'

const ERROR404 = 404
const ERROR400 = 400
const exceptionOptions = {
    maxLines: 1
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

function perpareCaseForApproval(caseData, eventToken, eventId, user, store) {
    const payload = {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderDirection: 'Order Accepted as drafted',
            orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
            orderDirectionJudge: 'District Judge',
            orderDirectionJudgeName: `${user.forename} ${user.surname} `,
            orderDirectionAddComments: store.notesForAdmin
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }

    return payload
}

function translate(store, fieldName) {
    if (store[fieldName]) {
        return translateJson.lookup[fieldName]
    }
    return null
}

function perpareCaseForConsentOrder(documentAnnotationId, eventToken, eventId, user, store) {
    const payload = {
        /* eslint-disable-next-line id-blacklist */
        data: {
            consentOrder: {
                document_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}`,
                document_binary_url: `${config.services.dm_store_api}//documents/${documentAnnotationId}/binary`
            }
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }

    return payload
}

function perpareCaseForRefusal(caseData, eventToken, eventId, user, store) {
    let orderRefusal = []
    let orderRefusalOther = null
    let orderRefusalNotEnough = []
    let orderRefusalNotEnoughOther = null
    let estimateLengthOfHearing = null
    let whenShouldHearingTakePlace = null
    let whereShouldHearingTakePlace = null
    let otherHearingDetails = null

    /* eslint-disable-next-line id-blacklist */

    orderRefusal.push(translate(store, 'orderNotAppearOfS25ca1973'))
    orderRefusal.push(translate(store, 'd81'))
    orderRefusal.push(translate(store, 'pensionAnnex'))
    orderRefusal.push(translate(store, 'applicantTakenAdvice'))
    orderRefusal.push(translate(store, 'respondentTakenAdvice'))

    if (store.partiesNeedAttend) {
        estimateLengthOfHearing = store.estimateLengthOfHearing
        whenShouldHearingTakePlace = store.whenHearingPlaced
        whereShouldHearingTakePlace = translate(store, 'whichCourt')
        otherHearingDetails = store.otherHearingDetails
    }

    if (store.NotEnoughInformation) {
        orderRefusalNotEnough.push(translate(store, 'capitalPositions'))
        orderRefusalNotEnough.push(translate(store, 'partiesHousingNeeds'))
        orderRefusalNotEnough.push(translate(store, 'justificationDeparture'))
        orderRefusalNotEnough.push(translate(store, 'partiesPensionProvision'))
        orderRefusalNotEnough.push(translate(store, 'childrensHousingNeeds'))
        orderRefusalNotEnough.push(translate(store, 'netEffectOrder'))
    }

    orderRefusal = orderRefusal.filter(x => Boolean(x))
    orderRefusalNotEnough = orderRefusalNotEnough.filter(x => Boolean(x))

    if (orderRefusal.length === 0) {
        orderRefusal = null
    }

    if (orderRefusalNotEnough.length === 0) {
        orderRefusalNotEnough = null
    }

    if (store.other) {
        orderRefusalNotEnoughOther = translate(store, 'informationNeeded')
    }

    if (store.other2) {
        orderRefusalOther = translate(store, 'Reason')
    }

    const orderRefusalCollection = {
        orderRefusalDate: moment(new Date()).format('YYYY-MM-DD'),
        orderRefusalJudge: 'District Judge',
        orderRefusalJudgeName: `${user.forename} ${user.surname} `,
        orderRefusalAddComments: store.notesForAdmin
    }

    const checkList = {
        orderRefusal,
        orderRefusalOther,
        orderRefusalNotEnough,
        orderRefusalNotEnoughOther,
        estimateLengthOfHearing,
        whenShouldHearingTakePlace,
        whereShouldHearingTakePlace,
        otherHearingDetails
    }

    Object.entries(checkList).forEach(keyValue => {
        logger.info('checking ', keyValue[0], ' with', keyValue[1])
        if (keyValue[1]) {
            orderRefusalCollection[keyValue[0]] = keyValue[1]
        }
    })

    const documentAnnotationId = store.documentAnnotationId

    orderRefusalCollection.orderRefusalDocs = {
        document_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}`,
        document_binary_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}/binary`
    }
    const payload = {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderRefusalCollection
        },
        event: {
            id: eventId
        },
        event_token: eventToken,

        ignore_warning: true
    }

    return payload
}

async function makeDecision(decision, req, state, store) {
    let payload = {}
    let eventToken = {}
    let caseDetails = {}

    try {
        logger.info('Getting Event Token')

        const event = decision === 'yes' ? 'FR_approveApplication' : 'FR_orderRefusal'

        const eventTokenAndCAse = await ccdStore.getEventTokenAndCase(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.inCaseId,
            event,
            getOptions(req)
        )

        eventToken = eventTokenAndCAse.token
        caseDetails = eventTokenAndCAse.caseDetails

        logger.info(`Got token ${eventToken}`)
    } catch (exception) {
        logger.error('Error getting event token', exceptionFormatter(exception, exceptionOptions))
        return false
    }

    if (decision === 'yes') {
        payload = perpareCaseForApproval(
            caseDetails,
            eventToken,
            'FR_approveApplication',
            req.session.user,
            store.get(`decisions_${state.inCaseId}`)
        )
    }
    console.log()
    if (decision === 'no') {
        payload = perpareCaseForRefusal(
            caseDetails,
            eventToken,
            'FR_orderRefusal',
            req.session.user,
            store.get(`decisions_${state.inCaseId}`)
        )
    }

    try {
        logger.info('Payload assembled')
        logger.info(JSON.stringify(payload))
        await ccdStore.postCaseWithEventToken(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.inCaseId,
            payload,
            getOptions(req)
        )

        return true
    } catch (exception) {
        logger.error('Error sending event', exceptionFormatter(exception, exceptionOptions))
        return false
    }
}

/* eslint-disable-next-line complexity */
async function handlePostState(req, res, responseJSON, state) {
    const store = new Store(req)
    const inCaseId = req.params.case_id

    const formValues = req.body.formValues
    let result = true

    if (formValues) {
        store.set(`decisions_${inCaseId}`, formValues)
    }

    /* eslint-disable indent */
    if (req.body.event === 'change') {
        // the 'state' will be the page to change
        responseJSON.newRoute = state.inStateId
    }
    if (req.body.event === 'continue') {
        switch (state.inStateId) {
            case 'create':
                if (formValues.approveDraftConsent === 'yes') {
                    responseJSON.newRoute = 'notes-for-court-administrator'
                } else {
                    responseJSON.newRoute = 'reject-reasons'
                }
                break
            case 'notes-for-court-administrator':
                responseJSON.newRoute = 'check'
                break
            case 'check':
                logger.info('Posting to CCD')
                result = false
                result = await makeDecision(store.get(`decisions_${inCaseId}`).approveDraftConsent, req, state, store)

                logger.info('Posted to CCD', result)

                if (result) {
                    responseJSON.newRoute = 'decision-confirmation'
                } else {
                    res.status(ERROR400)
                    res.send('Error updating case')
                }
                break
            case 'reject-reasons':
                if (formValues.includeAnnotatedVersionDraftConsOrder === 'yes') {
                    responseJSON.newRoute = 'draft-consent-order'
                } else if (formValues.partiesNeedAttend === true) {
                    responseJSON.newRoute = 'hearing-details'
                } else {
                    responseJSON.newRoute = 'notes-for-court-administrator'
                }
                break
            case 'draft-consent-order':
                if (formValues.partiesNeedAttend === true) {
                    responseJSON.newRoute = 'hearing-details'
                } else {
                    responseJSON.newRoute = 'notes-for-court-administrator'
                }
                break
            case 'hearing-details':
                responseJSON.newRoute = 'notes-for-court-administrator'
                break
            default:
                break
        }
        // update meta data according to newly selected state
        if (responseJSON.newRoute) {
            responseJSON.meta = stateMeta[state.inJurisdiction][responseJSON.newRoute]
        }
    }
    return result
    /* eslint-enable indent */
}

function responseAssert(res, responseJSON, inJurisdiction, inStateId, statusHint) {
    if (stateMeta[inJurisdiction] && stateMeta[inJurisdiction][inStateId]) {
        res.status(ERROR404)
        responseJSON.statusHint = statusHint
        return false
    }

    return true
}

async function handleStateRoute(req, res) {
    const store = new Store(req)
    const inJurisdiction = req.params.jur_id
    const inCaseId = req.params.case_id
    const inStateId = req.params.state_id

    const state = {
        inJurisdiction,
        inCaseId,
        inStateId
    }

    const responseJSON = {}
    let result = true

    if (
        responseAssert(res, responseJSON, stateMeta[inJurisdiction], 'Input parameter route_id: uknown jurisdiction') &&
        responseAssert(
            res,
            responseJSON,
            stateMeta[inJurisdiction][inStateId],
            `Input parameter route_id wrong: no route with this id inside jurisdiction ${inJurisdiction}`
        )
    ) {
        // for GET we return meta for the state requested by inStateId
        // however, for POST, the meta may get overwritten if the change of state occurs
        responseJSON.meta = stateMeta[inJurisdiction][inStateId]

        if (req.method === 'POST') {
            result = await handlePostState(req, res, responseJSON, state)
        }

        responseJSON.formValues = store.get(`decisions_${inCaseId}`) || {}
    }

    // logger.info(req.headers.ServiceAuthorization)
    // logger.info('########################')
    // logger.info(req.auth)
    // logger.info('########################')
    // logger.info(state)
    // logger.info('########################')
    logger.info(store.get(`decisions_${inCaseId}`) || {})
    // logger.info('########################')
    logger.info('Finished proccessing')
    if (result) {
        // no errors save and send responseJSON
        logger.info('Finishing with success')
        req.session.save(() => res.send(JSON.stringify(responseJSON)))
    } else {
        logger.error('Finishing with error')
    }
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/state/:jur_id/:case_id/:state_id', handleStateRoute)
    router.post('/state/:jur_id/:case_id/:state_id', handleStateRoute)
}
