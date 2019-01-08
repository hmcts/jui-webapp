import * as exceptionFormatter from 'exception-formatter'
import * as log4js from 'log4js'
import { config } from '../../../../config'
import { Store } from '../../../lib/store/store'

import * as moment from 'moment'
import * as translateJson from './translate'

import * as headerUtilities from '../../../lib/utilities/headerUtilities'

import * as Mapping from './mapping'
import * as  Templates from './templates'

export const mapping = Mapping.mapping
export const templates = Templates.templates

//ccdStore from '../../../services/ccd-store-api/ccd-store'

const ccdStore = require('../../../services/ccd-store-api/ccd-store')

const logger = log4js.getLogger('State')
logger.level = config.logging ? config.logging : 'OFF'

const ERROR400 = 400
const exceptionOptions = {
    maxLines: 1,
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

function perpareCaseForApproval(caseData, eventToken, eventId, user, store) {
    return {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderDirection: 'Order Accepted as drafted',
            orderDirectionAddComments: store.notesForAdmin,
            orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
            orderDirectionJudge: 'District Judge',
            orderDirectionJudgeName: `${user.forename} ${user.surname} `,
        },
        event: {
            id: eventId,
        },
        event_token: eventToken,

        ignore_warning: true,
    }
}

function translate(store, fieldName) {
    if (store[fieldName]) {
        return translateJson.lookup[fieldName]
    }
    return null
}

// function perpareCaseForConsentOrder(documentAnnotationId, eventToken, eventId, user, store) {
//     const payload = {
//         /* eslint-disable-next-line id-blacklist */
//         data: {
//             consentOrder: {
//                 document_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}`,
//                 document_binary_url: `${config.services.dm_store_api}//documents/${documentAnnotationId}/binary`
//             }
//         },
//         event: {
//             id: eventId
//         },
//         event_token: eventToken,

//         ignore_warning: true
//     }

//     return payload
// }

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

    const orderRefusalCollection: any = {
        orderRefusalAddComments: store.notesForAdmin,
        orderRefusalDate: moment(new Date()).format('YYYY-MM-DD'),
        orderRefusalJudge: 'District Judge',
        orderRefusalJudgeName: `${user.forename} ${user.surname} `,
    }

    const checkList = {
        estimateLengthOfHearing,
        orderRefusal,
        orderRefusalNotEnough,
        orderRefusalNotEnoughOther,
        orderRefusalOther,
        otherHearingDetails,
        whenShouldHearingTakePlace,
        whereShouldHearingTakePlace,
    }

    Object.entries(checkList).forEach(keyValue => {
        logger.info('checking ', keyValue[0], ' with', keyValue[1])
        if (keyValue[1]) {
            orderRefusalCollection[keyValue[0]] = keyValue[1]
        }
    })

    const documentAnnotationId = store.documentAnnotationId

    orderRefusalCollection.orderRefusalDocs = {
        document_binary_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}/binary`,
        document_url: `${config.services.dm_store_api}/documents/${documentAnnotationId}`,
    }
    return {
        /* eslint-disable-next-line id-blacklist */
        data: {
            orderRefusalCollection,
        },
        event: {
            id: eventId,
        },
        event_token: eventToken,

        ignore_warning: true,
    }
}

async function makeDecision(decision, req, state, store) {
    let payloadData = {}
    let eventToken = {}
    let caseDetails = {}

    try {
        logger.info('Getting Event Token')

        const event = decision === 'yes' ? 'FR_approveApplication' : 'FR_orderRefusal'

        const eventTokenAndCAse = await ccdStore.getEventTokenAndCase(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.caseId,
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
        payloadData = perpareCaseForApproval(
            caseDetails,
            eventToken,
            'FR_approveApplication',
            req.session.user,
            store
        )
    }

    if (decision === 'no') {
        payloadData = perpareCaseForRefusal(
            caseDetails,
            eventToken,
            'FR_orderRefusal',
            req.session.user,
            store
        )
    }

    try {
        logger.info('Payload assembled')
        logger.info(JSON.stringify(payloadData))
        await ccdStore.postCaseWithEventToken(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.caseId,
            payloadData,
            getOptions(req)
        )

        return true
    } catch (exception) {
        logger.error('Error sending event', exceptionFormatter(exception, exceptionOptions))
        return false
    }
}

export const payload: any = []

payload.divorce = async (req, res, store) => {
    //no payload
}

payload.financialremedymvp2 = async (req, res, store) => {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId
    const stateId = req.params.stateId

    const state = {
        caseId,
        caseTypeId,
        jurisdiction,
        stateId,
    }

    logger.info('Posting to CCD')
    let result = false
    result = await makeDecision(store.approveDraftConsent, req, state, store)

    logger.info('Posted to CCD', result)

    if (result) {
        return 'decision-confirmation'
    }

    res.status(ERROR400)
    res.send('Error updating case')
    return null
}
