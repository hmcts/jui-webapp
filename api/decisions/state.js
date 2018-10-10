const Store = require('../lib/store')
const generateRequest = require('../lib/request')
const config = require('../../config')
const express = require('express')
const moment = require('moment')
const stateMeta = require('./state_meta')
const log4js = require('log4js')

const logger = log4js.getLogger('State')
logger.level = config.logging

const ERROR404 = 404

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    }
}

async function getCaseWithEventToken(userId, jurisdiction, caseType, caseId, eventId, options) {
    const response = await generateRequest(
        'GET',
        `${
            config.services.ccd_data_api
        }/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`,
        options
    )
    return { token: response.token, caseDetails: response.case_details }
}

function perpareCaseForApproval(caseData, eventToken, user, store) {
    const payload = {
        ...caseData,
        event_token: eventToken,
        orderDirection: 'Order Accepted as drafted',
        orderDirectionDate: moment(new Date()).format('YYYY-MM-DD'),
        orderDirectionJudge: 'District Judge',
        orderDirectionJudgeName: `${user.forename} ${user.surname} `,
        orderDirectionAddComments: store.notesForAdmin
    }
    return payload
}

async function postCaseWithEventToken(payload, userId, options) {
    const response = await generateRequest(
        'GET',
        `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${payload.jurisdiction}/case-types/${
            payload.case_type_id
        }/cases/${payload.id}/event`,
        options
    )
    return response
}

async function approveDraft(req, state, store) {
    let payload = {}
    let eventToken = {}
    let caseDetails = {}

    try {
        const { _eventToken, _caseDetails } = await getCaseWithEventToken(
            req.auth.userId,
            'DIVORCE',
            'FinancialRemedyMVP2',
            state.inCaseId,
            'FR_approveApplication',
            getOptions(req)
        )

        eventToken = _eventToken
        caseDetails = _caseDetails

        payload = perpareCaseForApproval(
            caseDetails,
            eventToken,
            req.session.user,
            store.get(`decisions_${state.inCaseId}`)
        )
    } catch (exception) {
        logger.error('Error getting case even token')
        return false
    }

    payload = perpareCaseForApproval(
        caseDetails,
        eventToken,
        req.session.user,
        store.get(`decisions_${state.inCaseId}`)
    )
    postCaseWithEventToken(payload, req.auth.userId, getOptions(req))
    return true
}

/* eslint-disable-next-line complexity */
function handlePostState(req, res, responseJSON, state) {
    const store = new Store(req)
    const inCaseId = req.params.case_id

    const formValues = req.body.formValues

    if (formValues) {
        store.set(`decisions_${inCaseId}`, formValues)
    }

    /* eslint-disable indent */
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
                if (approveDraft(req, state, store)) {
                    // does the post
                    responseJSON.newRoute = 'decision-confirmation'
                } else {
                    // some error
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
                responseJSON.newRoute = 'check'
                break
            default:
                break
        }
        // update meta data according to newly selected state
        if (responseJSON.newRoute) {
            responseJSON.meta = stateMeta[theState.inJurisdiction][responseJSON.newRoute]
        }
    }

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

function handleStateRoute(req, res) {
    const store = new Store(req)
    const inJurisdiction = req.params.jur_id
    const inCaseId = req.params.case_id
    const inStateId = req.params.state_id

    const theState = {
        inJurisdiction,
        inCaseId,
        inStateId
    }

    const responseJSON = {}

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
            handlePostState(req, res, responseJSON, theState)
        }

        responseJSON.formValues = store.get(`decisions_${inCaseId}`) || {}
    }
    console.log(req.headers.ServiceAuthorization)
    console.log('########################')
    console.log(req.auth)
    console.log('########################')
    console.log(theState)
    console.log('########################')
    console.log(store.get(`decisions_${inCaseId}`))
    console.log('########################')

    req.session.save(() => res.send(JSON.stringify(responseJSON)))
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/state/:jur_id/:case_id/:state_id', handleStateRoute)
    router.post('/state/:jur_id/:case_id/:state_id', handleStateRoute)
}
