import * as express from 'express'
import { config } from '../../config'
import { http } from '../lib/http'
import { getHealth, getInfo } from '../lib/util'

const url = config.services.em_npa_api

async function createNpaTask(body) {
    const request = await http.post(`${url}/api/document-tasks`, body)
    return request.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/em-npa', router)

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo(url))

        router.post('/document-tasks', (req, res, next) => {

            createNpaTask(req.body)
                .then(response => {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    res.setHeader('content-type', 'application/json')
                    res.status(200).send(JSON.stringify(response))
                })
                .catch(response => {
                    res.status(response.error.status).send(response.error.message)
                })
        })
    })
}
