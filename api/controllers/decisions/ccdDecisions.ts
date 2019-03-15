import * as express from 'express'
import * as log4js from 'log4js'
import { config } from '../../../config'
import { asyncReturnOrError } from '../../lib/util'
import { listForHearingFR } from './divorce'

const logger = log4js.getLogger('auth')
logger.level = config.logging || 'off'

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/ccd', router)

    router.put('/:case_id/hearing/list', async (req: any, res) => {
        const userId = req.auth.userId
        const caseId = req.params.case_id

        const state = 'consentOrderNotApproved'
        const reason = req.body

        try {
            const response = await asyncReturnOrError(
                listForHearingFR(caseId, userId, req, reason, state),
                'Unable to list for hearing',
                res,
                logger
            )

            if (response) {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(response.status).send(JSON.stringify(response.data))
            }

        } catch (error) {

            if (error.hasOwnProperty('serviceError')) {
                return res.status(error.serviceError.status).send(error.serviceError.message)
            } else {
                return res.status(error.status).send(error.message)
            }
        }
    })
}
