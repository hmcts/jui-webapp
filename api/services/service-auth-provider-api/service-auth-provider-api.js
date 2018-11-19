const express = require('express')
const otp = require('otp')
const config = require('../../../config')
const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.s2s
const microservice = config.microservice
const s2sSecret = process.env.S2S_SECRET || 'AAAAAAAAAAAAAAAA'

function postS2SLease() {
    const oneTimePassword = otp({ secret: s2sSecret }).totp()
    const options = {
        headers: {},
        body: {
            microservice,
            oneTimePassword
        }
    }
    return generateRequest('POST', `${url}/lease`, options)
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return headerUtilities.getAuthHeadersWithS2SBearer(req)
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/s2s', router)

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })
}

module.exports.getInfo = getInfo

module.exports.getHealth = getHealth

module.exports.postS2SLease = postS2SLease
