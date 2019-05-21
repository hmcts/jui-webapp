import * as express from 'express'
import { config } from '../../config'
import { http } from '../lib/http'
import { getHealth, getInfo } from '../lib/util'

const url = config.services.bar_api


export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/bar', router)

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo(url))
    })
}
