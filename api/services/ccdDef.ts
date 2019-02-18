import * as express from 'express'
import { config } from '../../config'
import { http } from '../lib/http'
import { getHealth, getInfo } from '../lib/util'

const url = config.services.ccd_def_api

export async function getJurisdictions() {
    const response = await http.get(`${url}/api/data/jurisdictions`)
    return response.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/ccd-def', router)

    router.get('/jurisdictions', (req, res, next) => {
        res.send(getJurisdictions())
    })

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo(url))
    })
}

