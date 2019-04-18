/* tslint:disable:no-var-requires */
import * as exceptionFormatter from 'exception-formatter'
import { Request } from 'express'
import { config } from '../../../../config'
import * as log4jui from '../../../lib/log4jui'

import * as moment from 'moment'
import * as translateJson from './translate'

import * as headerUtilities from '../../../lib/utilities/headerUtilities'

import * as Mapping from './mapping'
import * as Templates from './templates'

export const mapping = Mapping.mapping
export const templates = Templates.templates

const ccdStore = require('../../../services/ccd-store-api/ccd-store')

const ERROR400 = 400
const exceptionOptions = {
    maxLines: 1,
}
const that = this

export function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

export function prepareCaseForApproval(eventToken, eventId, user, store) {
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

export function translate(store, fieldName) {
    if (store[fieldName]) {
        return translateJson.lookup[fieldName]
    }
    return null
}

export function prepareCaseForRefusal(eventToken, eventId, user, store) {
    const logger = log4jui.getLogger('State')

    let orderRefusal = []
    let orderRefusalOther = null
    let orderRefusalNotEnough = []
    let orderRefusalNotEnoughOther = null
    let estimateLengthOfHearing = null
    let whenShouldHearingTakePlace = null
    let whereShouldHearingTakePlace = null
    let otherHearingDetails = null

    /* eslint-disable-next-line id-blacklist */

    orderRefusal.push(that.translate(store, 'orderNotAppearOfS25ca1973'))
    orderRefusal.push(that.translate(store, 'd81'))
    orderRefusal.push(that.translate(store, 'pensionAnnex'))
    orderRefusal.push(that.translate(store, 'applicantTakenAdvice'))
    orderRefusal.push(that.translate(store,  'respondentTakenAdvice'))

    if (store.partiesNeedAttend) {
        estimateLengthOfHearing = store.estimateLengthOfHearing
        whenShouldHearingTakePlace = store.whenHearingPlaced
        whereShouldHearingTakePlace = that.translate(store, 'whichCourt')
        otherHearingDetails = store.otherHearingDetails
    }

    if (store.NotEnoughInformation) {
        orderRefusalNotEnough.push(that.translate(store, 'capitalPositions'))
        orderRefusalNotEnough.push(that.translate(store, 'partiesHousingNeeds'))
        orderRefusalNotEnough.push(that.translate(store, 'justificationDeparture'))
        orderRefusalNotEnough.push(that.translate(store, 'partiesPensionProvision'))
        orderRefusalNotEnough.push(that.translate(store, 'childrensHousingNeeds'))
        orderRefusalNotEnough.push(that.translate(store, 'netEffectOrder'))
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
        orderRefusalNotEnoughOther = that.translate(store, 'informationNeeded')
    }

    if (store.other2) {
        orderRefusalOther = that.translate(store, 'Reason')
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
        logger.info(`checking ${keyValue[0]} with ${keyValue[1]}`)
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

export async function getEventTokenForMakeDecision(decision: string, req: Request, state): Promise<any> {
    const logger = log4jui.getLogger('State')
    let eventToken = {}
    try {
        logger.info('Getting Event Token')

        const event = decision === 'yes' ? 'FR_approveApplication' : 'FR_orderRefusal'

        const eventTokenAndCase = await ccdStore.getEventTokenAndCase(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.caseId,
            event,
            that.getOptions(req)
        )

        eventToken = eventTokenAndCase.token

        logger.info(`Got token ${eventToken}`)
        return eventToken
    } catch (exception) {
        logger.error('Error getting event token', exceptionFormatter(exception, exceptionOptions))
        return false
    }
}

export async function getPayloadDataForMakeDecision(decision, req, state, store) {
    const eventToken = await that.getEventTokenForMakeDecision(decision, req, state)
    const logger = log4jui.getLogger('State')

    let payloadData

    if (decision === 'yes') {
        payloadData = that.prepareCaseForApproval(eventToken, 'FR_approveApplication', req.session.user, store)
    }

    if (decision === 'no') {
        payloadData = that.prepareCaseForRefusal(eventToken, 'FR_orderRefusal', req.session.user, store)
    }

    logger.info('Payload assembled')
    logger.info(JSON.stringify(payloadData))

    return payloadData
}

export async function makeDecision(decision: string, req, state, store): Promise<boolean> {
    const logger = log4jui.getLogger('State')
    const payloadData = await that.getPayloadDataForMakeDecision(decision, req, state, store)

    try {
        await ccdStore.postCaseWithEventToken(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.caseId,
            payloadData,
            that.getOptions(req)
        )
        return true
    } catch (exception) {
        logger.error('Error sending event', exceptionFormatter(exception, exceptionOptions))
        return false
    }
}

export const payload: any = []

payload.divorce = async () => {
    //no payload
}

payload.financialremedymvp2 = async (req, res, store) => {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId
    const stateId = req.params.stateId

    const logger = log4jui.getLogger('State')

    const state = {
        caseId,
        caseTypeId,
        jurisdiction,
        stateId,
    }

    logger.info('Posting to CCD')
    const result = await that.makeDecision(store.approveDraftConsent, req, state, store)

    logger.info('Posted to CCD', result)

    if (result) {
        return 'decision-confirmation'
    }

    res.status(ERROR400).send('Error updating case')
    return null
}
