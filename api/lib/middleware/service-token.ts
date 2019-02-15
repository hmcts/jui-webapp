import * as jwtDecode from 'jwt-decode'
import { config } from '../../../config'
import * as log4jui from '../../lib/log4jui'
import { postS2SLease } from '../../services/serviceAuth'
import { asyncReturnOrError } from '../util'

const logger = log4jui.getLogger('service-token')

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

async function generateToken() {
    const response = await postS2SLease()
    const tokenData = jwtDecode(response.data)

    _cache[microservice] = {
        expiresAt: tokenData.exp,
        token: response.data,
    }
}

async function serviceTokenGenerator() {
    if (validateCache()) {
        return getToken()
    } else {
        await generateToken()
    }
}

export default async (req, res, next) => {
    //const token = await asyncReturnOrError(serviceTokenGenerator(), 'Error getting s2s token', res, logger)
    const token = await serviceTokenGenerator()
    if (token) {
        req.headers.ServiceAuthorization = token.token
        next()
    }
}
