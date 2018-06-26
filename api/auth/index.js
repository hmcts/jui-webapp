const express = require('express');
const config = require('../../config');

const getTokenFromCode = require('./getTokenFromCode');
const getUserDetails = require('./getUserDetails');



module.exports = function(app) {
    const router = express.Router();

    app.use('/oauth2/callback', router);

    router.use((req, res) => {
        getTokenFromCode(req.query.code).then(data => {
            if(data.access_token) {
                getUserDetails(data.access_token).then(details => {
                    // console.log(details);
                    // console.log('-----------------------------');
                    res.cookie(config.cookies.token, data.access_token);
                    res.cookie(config.cookies.userId, details.id);
                    res.redirect('/');
                });
            }
        }).catch(e => {
            console.log('error - ', e);
            res.redirect('/');
        });
    });
};


