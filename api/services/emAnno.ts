import * as express from 'express'
import { config } from '../../config'
import { http } from '../lib/http'

const url = config.services.em_anno_api

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

    router.post('/annotation-sets', (req, res, next) => {
        // Called when get annotation-sets returns 404
        createAnnotationSet(req.body)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(response))
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message)
            })
    })

    router.get('/annotation-sets/:uuid', (req, res, next) => {
        const uuid = req.params.uuid

        getAnnotionSet(uuid)
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

    router.delete('/annotations/:uuid', (req, res, next) => {
        const uuid = req.params.uuid

        deleteAnnotation(uuid)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(response))
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message)
            })
    })

    router.post('/annotations', (req, res, next) => {

        addAnnotation(req.body)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('content-type', 'application/json')
                res.status(200).send(JSON.stringify(response))
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message)
            })
    })
}


