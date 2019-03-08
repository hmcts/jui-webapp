import * as express from 'express'
import {config} from '../../../config'
const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.em_npa_api

function createNpaTask(options) {
    return generateRequest('POST', `${url}/api/document-tasks`, options)
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
    app.use('/em-npa', router)

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })

    router.post('/document-tasks', (req, res, next) => {
        const options = getOptions(req)

        createNpaTask(options)
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
