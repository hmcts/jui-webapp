const express = require('express')
const config = require('../../config')

const { getDetails, postOauthToken } = require('../services/idam-api/idam-api');

const cookieToken = config.cookies.token;
const cookieUserId = config.cookies.userId;

module.exports = app => {
    const router = express.Router()

    app.use('/oauth2/callback', router)

    router.use((req, res, next) => {
        postOauthToken(req.query.code, req.get('host'))
            .then(data => {
                if (data.access_token) {
                    const options = { headers: { Authorization: `Bearer ${data.access_token}` } };
                    getDetails(options)
                        .then(details => {
                            res.cookie(cookieToken, data.access_token);
                            res.cookie(cookieUserId, details.id);
                            res.redirect('/');
                        });
                }
            })
            .catch(e => {
                console.log('error - ', e)
                res.redirect('/')
            })
    })

    app.use('/logout', (req, res, next) => {
        res.clearCookie(cookieToken);
        res.clearCookie(cookieUserId);
        res.redirect(req.query.redirect || '/');
    });
};
