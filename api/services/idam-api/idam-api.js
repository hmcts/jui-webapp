const express = require('express')
const config = require('../../../config')
const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.idam_api
const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA'
const idamClient = config.idam_client
const idamProtocol = config.protocol
const oauthCallbackUrl = config.oauth_callback_url

function getDetails(options) {
    return generateRequest('GET', `${url}/details`, options)
}

function postOauthToken(code, host) {
    const redirectUri = `${idamProtocol}://${host}/${oauthCallbackUrl}`
    const urlX = `${url}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`

    const options = {
        headers: {
            Authorization: `Basic ${Buffer.from(`${idamClient}:${idamSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    return generateRequest('POST', `${urlX}`, options)
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/idam', router)

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })

    router.get('/details', (req, res, next) => {
        getDetails(getOptions(req)).pipe(res)
    })
}

module.exports.getInfo = getInfo

module.exports.getHealth = getHealth

module.exports.getOptions = getOptions

module.exports.getDetails = getDetails

module.exports.postOauthToken = postOauthToken
