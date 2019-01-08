import axios from 'axios'
const jwtDecode = require('jwt-decode')
import { config } from '../../../config'

module.exports = (req, res, next) => {
    const userId = req.headers[config.cookies.userId] || req.cookies[config.cookies.userId]
    const jwt = req.headers.authorization || req.cookies[config.cookies.token]
    const jwtData = jwtDecode(jwt)
    const expires = new Date(jwtData.exp).getTime()
    const now = new Date().getTime() / 1000
    const expired = expires < now

    if (expired) {
        res.status(401).send('Token expired!')
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
