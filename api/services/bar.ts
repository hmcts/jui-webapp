import * as express from 'express'
import { config } from '../../config'
import { getHealth, getInfo } from '../lib/util'

const url = config.services.bar_api

export async function getHealthRoute(req: express.Request, res: express.Response) {
    const response = await getHealth(url)
    res.status(200).send(response)
}

export async function getInfoRoute(req: express.Request, res: express.Response) {
    const response = await getInfo(url)
    res.status(200).send(response)
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/bar', router)

    router.get('/health', getHealthRoute)

    router.get('/info', getInfoRoute)
}
