const express = require('express')
const config = require('../../../config')
const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.ccd_data_api

function getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`
    return generateRequest('GET', urlX, options)
}

// async version of getCCDEventToken
async function getEventTokenAndCase(userId, jurisdiction, caseType, caseId, eventId, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`
    const response = await generateRequest('GET', urlX, options)
    return { token: response.token, caseDetails: response.case_details }
}

function getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/event-triggers/${eventId}/token`
    return generateRequest('GET', urlX, options)
}

// async version of postCCDEvent
async function postCaseWithEventToken(userId, jurisdiction, caseTypeId, caseId, body, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseTypeId}/cases/${caseId}/events`
    await generateRequest('POST', urlX, { ...options, body })
}

function postCCDEvent(userId, jurisdiction, caseType, caseId, body, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    return generateRequest('POST', urlX, { ...options, body })
}

function getCCDCase(userId, jurisdiction, caseType, caseId, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`
    return generateRequest('GET', urlX, options)
}

function getCCDEvents(userId, jurisdiction, caseType, caseId, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    return generateRequest('GET', urlX, options)
}

function getCCDCases(userId, jurisdiction, caseType, filter, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC${filter}`
    return generateRequest('GET', urlX, options)
}

function postCCDCase(userId, jurisdiction, caseType, body, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases`
    return generateRequest('POST', urlX, { ...options, body })
}

// TODO: This should eventually replace ccd better mutijud search
// jurisdictions is [{jur,caseType,filter},...]
function getMutiJudCCDCases(userId, jurisdictions, options) {
    function handle(promise) {
        return promise.then(
            v => {
                return { v, status: true }
            },
            failure => {
                return { failure, status: false }
            }
        )
    }
    const promiseArray = []
    jurisdictions.forEach(jurisdiction => {
        promiseArray.push(getCCDCases(userId, jurisdiction.jur, jurisdiction.caseType, jurisdiction.filter, options))
    })

    return Promise.all(promiseArray.map(handle)).then(results => results.filter(x => x.status).map(x => x.v))
}

function createCase(userId, jurisdiction, caseType, eventId, description, summary, data, options) {
    return getCCDEventTokenWithoutCase(userId, jurisdiction, caseType, eventId, options)
        .then(eventToken => {
            return {
                event: {
                    id: eventId,
                    description,
                    summary
                },
                event_token: eventToken.token,
                ignore_warning: true,
                data
            }
        })
        .then(obj => { console.dir(obj); return obj }) // use to debug case creation or update
        .then(body => postCCDCase(userId, jurisdiction, caseType, body, options))
}

function updateCase(userId, jurisdiction, caseType, caseId, eventId, description, summary, data, options) {
    return getCCDEventToken(userId, jurisdiction, caseType, caseId, eventId, options)
        .then(eventToken => {
            return {
                event: {
                    id: eventId,
                    description,
                    summary
                },
                event_token: eventToken.token,
                ignore_warning: true,
                data
            }
        })
        .then(obj => { console.dir(obj); return obj }) // use to debug case creation or update
        .then(body => postCCDEvent(userId, jurisdiction, caseType, caseId, body, options))
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/ccd-store', router)

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })
}

module.exports.getInfo = getInfo

module.exports.getHealth = getHealth

module.exports.getCCDCase = getCCDCase

module.exports.postCCDCase = postCCDCase

module.exports.getCCDCases = getCCDCases

module.exports.getCCDEvents = getCCDEvents

module.exports.getMutiJudCCDCases = getMutiJudCCDCases

module.exports.getCCDEventToken = getCCDEventToken

module.exports.getCCDEventTokenWithoutCase = getCCDEventTokenWithoutCase

module.exports.getEventTokenAndCase = getEventTokenAndCase

module.exports.postCCDEvent = postCCDEvent

module.exports.postCaseWithEventToken = postCaseWithEventToken

module.exports.createCase = createCase

module.exports.updateCase = updateCase
