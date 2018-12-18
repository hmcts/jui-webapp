import * as log4js from 'log4js'
import * as moment from 'moment'
import { config } from '../../config'
import { http } from '../lib/http'

export const url = config.services.coh_cor_api

const logger = log4js.getLogger('cases')
logger.level = config.logging || 'off'

interface DateTimeObject {
    date: string
    dateUtc: string
    time: string
}

function convertDateTime(dateObj: string): DateTimeObject {
    const conDateTime = moment(dateObj)
    const dateUtc = conDateTime.utc().format()
    const date = conDateTime.format('D MMMM YYYY')
    const time = conDateTime.format('h:mma')

    return { date, dateUtc, time }
}

function mergeCohEvents(eventsJson: any): any[] {
    const history = eventsJson.online_hearing.history
    const questionHistory = eventsJson.online_hearing.questions
        ? eventsJson.online_hearing.questions
            .map(arr => arr.history)
            .reduce((historyArray, item) => historyArray.concat(item), [])
        : []

    const answersHistory = eventsJson.online_hearing.answers
        ? eventsJson.online_hearing.answers.map(arr => arr.history).reduce((historyArray, item) => historyArray.concat(item), [])
        : []

    const decisionHistory = eventsJson.online_hearing.decision ? eventsJson.online_hearing.decision.history : []
    return [...history, ...questionHistory, ...answersHistory, ...decisionHistory]
}

export async function createHearing(caseId: string, userId: string, jurisdictionId: string = 'SSCS'): Promise<string> {
    const response = await http.post(`${url}/continuous-online-hearings`, {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: new Date().toISOString(),
    })

    return response.data.online_heading_id
}

export async function getHearing(caseId: string): Promise<any> {
    const response = await http.get(`${url}/continuous-online-hearings?case_id=${caseId}`)
    return response.data
}

export async function getHearingByCase(caseId: string): Promise<any> {
    const response = await http.get(`${url}/continuous-online-hearings?case_id=${caseId}`)
    return response.data
}

export async function getEvents(caseId: string, userId: string): Promise<any[]> {
    let hearingId

    const hearing = await getHearing(caseId)

    if (hearing) {
        hearingId = hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : null
    } else {
        hearingId = await createHearing(caseId, userId)
    }

    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}/conversations`)

    return mergeCohEvents(response.data).map(event => {
        const dateObj = convertDateTime(event.state_datetime)
        const dateUtc = dateObj.dateUtc
        const date = dateObj.date
        const time = dateObj.time

        return {
            by: 'coh',
            date,
            dateUtc,
            documents: [],
            time,
            title: event.state_desc,
        }
    })
}

export async function getDecision(hearingId: string): Promise<any> {
    logger.info(`Getting decision with hearing Id ${hearingId}`)
    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}/decisions`)
    return response.data
}

export async function getOrCreateHearing(caseId, userId) {
    const hearing = await getHearing(caseId)
    let hearingId

    if (hearing) {
        hearingId = hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : null
    } else {
        hearingId = await createHearing(caseId, userId)
    }

    return hearingId
}

export async function createDecision(hearingId: string): Promise<string> {
    const response = await http.post(`${url}/continuous-online-hearings/${hearingId}/decisions`, {
        "decision_award": "n/a",
        "decision_header": "n/a",
        "decision_reason": "n/a",
        "decision_text": "n/a",
    })

    return response.data.decision_id
}

export async function storeData(hearingId, data) {
    const response = await http.put(`${url}/continuous-online-hearings/${hearingId}/decisions`, {
        "decision_award": "n/a",
        "decision_header": "n/a",
        "decision_reason": "n/a",
        "decision_state": "decision_drafted",
        "decision_text": JSON.stringify(data),
    })
}

export async function getData(hearingId) {

    let response

    try {
        response = await http.get(`${url}/continuous-online-hearings/${hearingId}/decisions`)
    } catch {
        logger.info(`No decision for hearing ${hearingId} found`)
    }
    const data = response.data.decision_text || {}
    try {
        return JSON.parse(data)
    } catch {
        return {}
    }
}

export async function getOrCreateDecision(caseId, userId) {
    let decisionId
    let decision

    // first lets try and get a hearing
    const hearingId = await getOrCreateHearing(caseId, userId)

    if (!hearingId) {
        logger.error('Error getting hearing for decision!')
    } else {
        logger.info(`Got hearding for case ${caseId}`)
        try {
            decision = await getDecision(hearingId)
            logger.info(decision)
        } catch {
            logger.info(`Can't find decision`)
        }

        if (decision) {
            decisionId = decision.decision_id ? decision.decision_id : null
        }
        if (!(decision && decisionId)) {
            logger.info(`Can't find decision, creating`)
            decisionId = await createDecision(hearingId)
        }
    }

    // needs to return hearingId
    return hearingId
}

export class Store {
    hearingId

    constructor(hearingId) {
        this.hearingId = hearingId
    }

    async set(key, value) {
        const data = {}
        data[key] = value
        await storeData(this.hearingId, data)

    }

    async get(key) {
        const data = await getData(this.hearingId)
        return data[key]
    }
}
