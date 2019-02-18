import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { config } from '../../../config'
import * as auth from '../../controllers/auth'
import * as log4jui from '../../lib/log4jui'

const logger = log4jui.getLogger('auth')

module.exports = (req, res, next) => {
    const userId = req.headers[config.cookies.userId] || req.cookies[config.cookies.userId]
    const jwt = req.headers.authorization || req.cookies[config.cookies.token]
    const jwtData = jwtDecode(jwt)
    const expires = new Date(jwtData.exp).getTime()
    const now = new Date().getTime() / 1000
    const expired = expires < now

    if (expired || !req.session.user) {
        logger.warn('Auth token or user expired need to log in again')
        auth.logout(req, res)

    } else {
        req.auth = jwtData
        req.auth.token = jwt
        req.auth.userId = userId

        axios.defaults.headers.common.Authorization = `Bearer ${req.auth.token}`
        axios.defaults.headers.common['user-roles'] = req.auth.data
        if (req.headers.ServiceAuthorization) {
            axios.defaults.headers.common.ServiceAuthorization = req.headers.ServiceAuthorization
        }
        next()
    }
}
