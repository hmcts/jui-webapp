const express = require('express')
const config = require('../../config')

const getTokenFromCode = require('./getTokenFromCode')
const getUserDetails = require('./getUserDetails')

module.exports = app => {
    const router = express.Router()

    app.use('/oauth2/callback', router)

    router.use((req, res, next) => {
        getTokenFromCode(req.query.code, req)
            .then(token => {
                if (token.access_token) {
                    getUserDetails(token.access_token).then(details => {
                        req.session.user = details
                        res.cookie(config.cookies.token, token.access_token)
                        res.cookie(config.cookies.userId, details.id)
                        res.redirect('/')
                    })
                }
            })
            .catch(e => {
                console.log('error - ', e)
                res.redirect('/')
            })
    })

    app.use('/logout', (req, res, next) => {
        res.clearCookie(config.cookies.token)
        res.clearCookie(config.cookies.userId)
        const redirectUrl = req.query.redirect || '/'
        res.redirect(redirectUrl)
    })
}
