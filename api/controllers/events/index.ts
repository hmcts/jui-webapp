import * as express from 'express'
const moment = require('moment')
const getEventTemplate = require('./templates/index')

const { getCCDEvents } = require('../../services/ccd-store-api/ccd-store')
import { dataLookup as valueProcessor } from '../../lib/processors/value-processor'
import { getHearingIdOrCreateHearing, getOnlineHearingConversation } from '../../services/cohQA'

export function hasCOR(jurisdiction) {
    return jurisdiction === 'SSCS'
}

export function convertDateTime(dateObj) {
    const conDateTime = moment(dateObj)
    const dateUtc = conDateTime.utc().format()
    const date = conDateTime.format('D MMMM YYYY')
    const time = conDateTime.format('h:mma')

    return {
        dateUtc,
        date,
        time
    }
}

/**
 * CCD EVENT Data
 */

export function reduceCcdEvents(jurisdiction, caseType, caseId, events) {
    return events.map(event => {
        const dateObj = convertDateTime(event.created_date)
        const dateUtc = dateObj.dateUtc
        const date = dateObj.date
        const time = dateObj.time

        valueProcessor(getEventTemplate(jurisdiction, caseType), event)

        const documents = event.documents.map(doc => {
            return {
                name: `${doc.document_filename}`,
                href: `/case/${jurisdiction}/${caseType}/${caseId}/casefile/${doc.id}`
            }
        })

        return {
            title: event.event_name,
            by: `${event.user_first_name} ${event.user_last_name}`,
            dateUtc,
            date,
            time
            // ,documents // renable when we want to actuall show documents
        }
    })
}

export async function getCcdEvents(userId, jurisdiction, caseType, caseId) {
    return await getCCDEvents(userId, jurisdiction, caseType, caseId).then(events =>
        reduceCcdEvents(jurisdiction, caseType, caseId, events)
    )
}

/**
 * COH EVENT Data
 */

export function getHistory(arrObject) {
    return arrObject.map(arr => arr.history).reduce((history, item) => history.concat(item), [])
}

export function mergeCohEvents(eventsJson) {
    const history = eventsJson.online_hearing.history
    const questionHistory = eventsJson.online_hearing.questions ? getHistory(eventsJson.online_hearing.questions) : []
    const answersHistory = eventsJson.online_hearing.answers ? getHistory(eventsJson.online_hearing.answers) : []
    const decisionHistory = eventsJson.online_hearing.decision ? eventsJson.online_hearing.decision.history : []
    return [...history, ...questionHistory, ...answersHistory, ...decisionHistory]
}

export function reduceCohEvents(events) {
    return events.map(event => {
        const dateObj = convertDateTime(event.state_datetime)
        const dateUtc = dateObj.dateUtc
        const date = dateObj.date
        const time = dateObj.time

        return {
            title: event.state_desc,
            by: 'coh',
            dateUtc,
            date,
            time,
            documents: []
        }
    })
}

export async function getCohEvents(userId, caseId) {
    const hearingId = await getHearingIdOrCreateHearing(caseId)
    const conversation = await getOnlineHearingConversation(hearingId)
    const mergedEvents = mergeCohEvents(conversation)
    return reduceCohEvents(mergedEvents)
}

/**
 * Event Functions
 */

export function combineLists(lists) {
    return [].concat(...lists)
}

export function sortEvents(events) {
    return events.sort((result1, result2) =>
        moment.duration(moment(result2.dateUtc).diff(moment(result1.dateUtc))).asMilliseconds())
}

export async function getEvents(userId, jurisdiction, caseType, caseId) {
    let cohEvents: Promise<any[]> | any = []
    const ccdEvents = await getCcdEvents(userId, jurisdiction, caseType, caseId)

    if (hasCOR(jurisdiction)) {
        cohEvents = await getCohEvents(userId, caseId)
    }

    const combined = combineLists([ccdEvents, cohEvents])
    return sortEvents(combined)

}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/caseE', router)

    router.get('/:jur/:casetype/:case_id/events', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype

        getEvents(userId, jurisdiction, caseType, caseId).then(results => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        })
    })

    router.get('/:jur/:casetype/:case_id/events/raw', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype

        getCCDEvents(userId, jurisdiction, caseType, caseId).then(results => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(results))
        })
    })
}

module.exports.getEvents = getEvents
module.exports.hasCOR = hasCOR
module.exports.convertDateTime = convertDateTime
module.exports.sortEvents = sortEvents
module.exports.combineLists = combineLists
module.exports.reduceCcdEvents = reduceCcdEvents
module.exports.getHistory = getHistory
module.exports.getCcdEvents = getCcdEvents
module.exports.getCohEvents = getCohEvents
module.exports.reduceCohEvents = reduceCohEvents
module.exports.mergeCohEvents = mergeCohEvents
