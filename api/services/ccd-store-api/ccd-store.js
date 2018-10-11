const express = require('express')
const config = require('../../../config')
const generateRequest = require('../../lib/request')

const url = config.services.ccd_data_api

// No need to pollute codebase with endless mock requests given that this differs minorly to the main request?
// Do switch in one place
// Don't check envromental strings all over code base , its a global dependency so should be set in one place https://eslint.org/docs/rules/no-process-env

// TODO remove the CCD part

async function getEventTokenAndCase(userId, jurisdiction, caseType, caseId, eventId, options) {
    const response = await generateRequest(
        'GET',
        `${
            config.services.ccd_data_api
        }/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`,
        options
    )

    return { token: response.token, caseDetails: response.case_details }
}

async function postCaseWithEventToken(payload, userId, options) {
    console.log(
        'Going to :',
        `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${
            payload.jurisdiction
        }/case-types/${payload.case_type_id}/cases/${payload.id}/events`
    )

    options.body = payload
    try {
        const response = await generateRequest(
            'POST',
            `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${
                payload.jurisdiction
            }/case-types/${payload.case_type_id}/cases/${payload.id}/events`,
            options
        )

        return response
    } catch (exception) {
        console.log('ERROR', exception)
    }
    return false
}

function getCCDCase(userId, jurisdiction, caseType, caseId, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`
    return generateRequest('GET', urlX, options)
}

function getCCDEvents(caseId, userId, jurisdiction, caseType, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    return generateRequest('GET', urlX, options)
}

function getCCDCases(userId, jurisdiction, caseType, filter, options) {
    const urlX = `${url}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases?sortDirection=DESC${filter}`
    return generateRequest('GET', urlX, options)
}

// TODO: This should eventually replace ccd better mutijud search
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
        promiseArray.push(
            getCCDCases(
                userId,
                jurisdiction.jur,
                jurisdiction.caseType,
                jurisdiction.filter,
                options
            )
        )
    })

    return Promise.all(promiseArray.map(handle)).then(results => {
        return results.filter(x => x.status).map(x => x.v)
    })
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    }
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

// dont link exports like this
// module.exports.getCCDCase = getCCDCase

module.exports = {
    getCCDCase,
    getCCDEvents,
    getCCDCases,
    getMutiJudCCDCases,
    getEventTokenAndCase,
    postCaseWithEventToken
}
