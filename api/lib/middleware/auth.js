const jwtDecode = require('jwt-decode')
const config = require('../../../config')

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
        next()
    }
}
