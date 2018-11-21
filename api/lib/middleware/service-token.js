const { postS2SLease } = require('../../services/service-auth-provider-api/service-auth-provider-api')
const jwtDecode = require('jwt-decode')
const config = require('../../../config')

const _cache = {}
const microservice = config.microservice

function validateCache() {
    const currentTime = Math.floor(Date.now() / 1000)
    if (!_cache[microservice]) return false
    return currentTime < _cache[microservice].expiresAt
}

function getToken() {
    return _cache[microservice]
}

function generateToken() {
    return new Promise((resolve, reject) => {
        postS2SLease()
            .then(body => {
                const tokenData = jwtDecode(body)
                _cache[microservice] = {
                    expiresAt: tokenData.exp,
                    token: body
                }
                resolve()
            })
            .catch(e => {
                console.log('Error creating S2S token! S2S service error - ', e.message)
                reject()
            })
    })
}

function serviceTokenGenerator() {
    return new Promise((resolve, reject) => {
        if (validateCache()) {
            resolve(getToken())
        } else {
            generateToken()
                .then(() => {
                    resolve(getToken())
                })
                .catch(e => {
                    console.log('Failed to get S2S token')
                    reject()
                })
        }
    })
}

module.exports = async (req, res, next) => {
    try {
        const token = await serviceTokenGenerator()
        req.headers.ServiceAuthorization = token.token
    } catch (e) {
        console.log('Could not add S2S token header')
    }

    next()
}
