import * as express from 'express'
import {config} from '../../../config'
const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.em_anno_api

function getAnnotionSet(uuid, options) {
    return generateRequest('GET', `${url}/api/annotation-sets/filter?documentId=${uuid}`, options)
}

function createAnnotationSet(options) {
    return generateRequest('POST', `${url}/api/annotation-sets/`, options)
}

function addAnnotation(options) {
    return generateRequest('POST', `${url}/api/annotations`, options)
}

function deleteAnnotation(uuid, options) {
    return generateRequest('DELETE', `${url}/api/annotations/${uuid}`, options)
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return headerUtilities.getAuthHeadersWithBody(req)
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/em-anno', router)

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })

    router.post('/annotation-sets', (req, res, next) => {
        // Called when get annotation-sets returns 404
        const options = getOptions(req)

        createAnnotationSet(options)
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
        const options = getOptions(req)
        const uuid = req.params.uuid

        getAnnotionSet(uuid, options)
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
        const options = getOptions(req)
        const uuid = req.params.uuid

        deleteAnnotation(uuid, options)
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
        const options = getOptions(req)

        addAnnotation(options)
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

module.exports.getInfo = getInfo

module.exports.getHealth = getHealth

module.exports.getAnnotionSet = getAnnotionSet

module.exports.createAnnotationSet = createAnnotationSet

module.exports.addAnnotation = addAnnotation

module.exports.deleteAnnotation = deleteAnnotation
