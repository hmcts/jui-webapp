import * as exceptionFormatter from 'exception-formatter'
import * as log4js from 'log4js'
import { config } from '../../../../config'
import * as headerUtilities from '../../../lib/utilities/headerUtilities'
import * as coh from '../../../services/coh'
import * as Mapping from './mapping'
import * as Templates from './templates'

const ERROR400 = 400
export const mapping = Mapping.mapping
export const templates = Templates.templates

const ccdStore = require('../../../services/ccd-store-api/ccd-store')

const logger = log4js.getLogger('scss engine')
logger.level = config.logging ? config.logging : 'OFF'

const exceptionOptions = {
    maxLines: 1,
}

export async function init(req, res) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()

    const hearingId = await coh.getOrCreateDecision(req.params.caseId, req.auth.userId)

    return hearingId
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

function perpareCaseForFinalDecision(eventToken, eventId, data) {
    /* eslint-disable-next-line id-blacklist */

    return {
        /* eslint-disable-next-line id-blacklist */
        data: {
            decisionNotes: data.decisionNotes,
        },
        event: {
            id: eventId,
        },
        event_token: eventToken,

        ignore_warning: true,
    }
}
async function finalDecision(req, state, data) {
    let payloadData = {}
    let eventToken = {}
    let caseDetails = {}

    const event = 'corDecision'

    try {
        logger.info('Getting Event Token')

        const eventTokenAndCase = await ccdStore.getEventTokenAndCase(
            req.auth.userId,
            'SSCS',
            'Benefit',
            state.caseId,
            event,
            getOptions(req)
        )

        eventToken = eventTokenAndCase.token
        caseDetails = eventTokenAndCase.caseDetails

        logger.info(`Got token ${eventToken}`)
    } catch (exception) {
        logger.error('Error sending event', exceptionFormatter(exception, exceptionOptions))
        return false
    }

    payloadData = perpareCaseForFinalDecision(eventToken, event, data)

    try {
        logger.info('Payload assembled')
        logger.info(JSON.stringify(payloadData))

        await ccdStore.postCaseWithEventToken(req.auth.userId, 'SSCS', 'Benefit', state.caseId, payloadData, getOptions(req))

        return true
    } catch (exception) {
        logger.error('Error sending event', exceptionFormatter(exception, exceptionOptions))
        return false
    }
}

export async function payload(req, res, data) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()
    const stateId = req.params.stateId

    const state = {
        caseId,
        caseTypeId,
        jurisdiction,
        stateId,
    }

    if (stateId === 'check-tribunal') {
        // lets update the state on the COH decision
        // get hearingId
        const hearingId = await coh.getOrCreateDecision(req.params.caseId, req.auth.userId)
        // then save

        const keyedData = {}
        keyedData[`decisions_${jurisdiction}_${caseTypeId}_${caseId}`] = data
        await coh.storeData(hearingId, keyedData, 'decision_issue_pending')
        return 'decision-confirmation'
    }
    if (stateId === 'check-final-decision') {
        logger.info('Posting to CCD')
        let result = true
        result = await finalDecision(req, state, data)

        logger.info('Posted to CCD', result)

        if (result) {
            return 'decision-confirmation'
        }

        res.status(ERROR400)
        res.send('Error updating case')
        return null
    }
}
