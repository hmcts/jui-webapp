import * as express from 'express'
import { config } from '../../config'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { asyncReturnOrError } from '../lib/util'

const url = config.services.em_anno_api

const logger = log4jui.getLogger('annotations')

export async function getAnnotionSet(uuid: string) {
    const request = await http.get(`${url}/api/annotation-sets/filter?documentId=${uuid}`)
    return request.data
}

export async function createAnnotationSet(body: string) {
    const request = await http.post(`${url}/api/annotation-sets/`, body)
    return request.data
}
export async function addAnnotation(body: string) {
    const request = await http.post(`${url}/api/annotations`, body)
    return request.data
}

export async function deleteAnnotation(uuid: string) {
    const request = await http.post(`${url}/api/annotations/${uuid}`)
    return request.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/em-anno', router)

    router.post('/annotation-sets', async (req, res, next) => {
        // Called when get annotation-sets returns 404
        const response = await asyncReturnOrError(createAnnotationSet(req.body), ' Error creating annotations', res, logger)

        if (response) {
            res.status(200).send(JSON.stringify(response))
        }
    })

    router.get('/annotation-sets/:uuid', async (req, res, next) => {
        const uuid = req.params.uuid
        const response = await asyncReturnOrError(getAnnotionSet(uuid), ' Error getting annotations', res, logger)

        if (response) {
            res.status(200).send(JSON.stringify(response))
        }

    })

    router.delete('/annotations/:uuid', async (req, res, next) => {
        const uuid = req.params.uuid

        const response = await asyncReturnOrError(deleteAnnotation(uuid), ' Error deleting annotations', res, logger)

        if (response) {
            res.status(200).send(JSON.stringify(response))
        }

    })

    router.post('/annotations', async (req, res, next) => {

        const response = await asyncReturnOrError(addAnnotation(req.body), ' Error deleting annotations', res, logger)

        if (response) {
            res.status(200).send(JSON.stringify(response))
        }
    })
}
