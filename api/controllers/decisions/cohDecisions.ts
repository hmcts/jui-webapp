import * as express from 'express'
import * as headerUtilities from '../../lib/utilities/headerUtilities'
import {getHearing, relistHearing} from '../../services/coh'

const {getHearingIdOrCreateHearing, getDecision, postDecision, putDecision} = require('../../services/coh-cor-api/coh-cor-api')

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/:case_id', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const options = getOptions(req)

        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(hearingId => getDecision(hearingId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(201).send(JSON.stringify(response))
            })
            .catch(response => {
                res.status(response.statusCode).send(response.error.message)
            })
    })

    router.post('/:case_id', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const options = getOptions(req)

        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(hearingId => postDecision(hearingId, options, req.body))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(201).send(JSON.stringify(response))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.error.status).send(response.error.message)
            })
    })

    router.put('/:case_id', (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id
        const options = getOptions(req)

        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(hearingId => putDecision(hearingId, options, req.body))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(response))
            })
            .catch(response => {
                console.log(response.error || response)
                res.status(response.error.status).send(response.error.message)
            })
    })

    /**
     * Returns a list of online hearings
     */
    router.get('/:case_id/hearing', async (req: any, res, next) => {
        const caseId = req.params.case_id

        try {
            const response = await getHearing(caseId)

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')

            res.status(200).send(JSON.stringify(response))
        } catch (error) {

            res.status(400).send(JSON.stringify(error))
        }
    })

    router.put('/:case_id/hearing/relist', async (req: any, res, next) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id

        const state = req.body.state
        const reason = req.body.reason

        try {
            const response = await relistHearing(caseId, userId, state, reason)

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')

            res.status(response.status).send(JSON.stringify(response.data))
        } catch (error) {

            if (error.hasOwnProperty('serviceError')) {
                return res.status(error.serviceError.status).send(error.serviceError.message)
            } else {
                return res.status(error.status).send(error.message)
            }
        }
    })
}
