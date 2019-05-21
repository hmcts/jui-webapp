import { Request, Response, Router } from 'express'
import { accessControlAllowOriginHeaders } from '../../lib/middleware/accessControlAllowOriginHeaders'
import { getHearingByCase, relistHearing } from '../../services/coh'
import { getDecision, getHearingIdOrCreateHearing, postDecision, putDecision } from '../../services/cohQA'

export async function getDecisionForCase(req: Request, res: Response) {
    const caseId: string = req.params.case_id

    try {
        const hearingId = await getHearingIdOrCreateHearing(caseId)
        const response = await getDecision(hearingId)
        res.status(201).send(response)
    } catch (error) {
        res.status(error.statusCode).send(error.message)
    }
}

export async function postDecisionForCase(req: Request, res: Response) {
    const caseId: string = req.params.case_id

    try {
        const hearingId = await getHearingIdOrCreateHearing(caseId)
        const response = await postDecision(hearingId, req.body)
        res.status(201).send(response)
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export async function putDecisionForCase(req: Request, res: Response) {
    const caseId: string = req.params.case_id

    try {
        const hearingId = await getHearingIdOrCreateHearing(caseId)
        const response = await putDecision(hearingId, req.body)
        res.status(200).send(response)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}

/**
 * Returns a list of online hearings
 */
export async function getCaseHearings(req: Request, res: Response) {
    const caseId: string = req.params.case_id

    try {
        const response = await getHearingByCase(caseId)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}

export async function relistHearingForCase(req: any | Request, res: Response) {
    const userId = req.auth.userId
    const caseId = req.params.case_id
    const state = req.body.state
    const reason = req.body.reason

    try {
        const response = await relistHearing(caseId, userId, state, reason)
        res.status(response.status).send(response.data)
    } catch (error) {

        if (error.hasOwnProperty('serviceError')) {
            return res.status(error.serviceError.status).send(error.serviceError.message)
        } else {
            return res.status(error.status).send(error.message)
        }

    }
}

export default app => {
    const router = Router({ mergeParams: true })

    app.use('/decisions', accessControlAllowOriginHeaders, router)

    router.get('/:case_id', getDecisionForCase)

    router.post('/:case_id', postDecisionForCase)

    router.put('/:case_id', putDecisionForCase)

    router.get('/:case_id/hearing', getCaseHearings)

    router.put('/:case_id/hearing/relist', relistHearingForCase)
}
