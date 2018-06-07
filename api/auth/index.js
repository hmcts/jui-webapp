const request = require('request-promise');
const express = require('express');
const router = express.Router();
const proxy = require('../lib/proxy');
const config = require('../../config');


function getTokenFromCode(code) {
    const secret = process.env.IDAM_SECRET;
    const Authorization = 'Basic ' + new Buffer(`${config.idam_client}:${secret}`).toString('base64');
    let url = `${config.services.idam_api}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/oauth2/callback`;
    let options = {
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': Authorization
        }
    };
    options = proxy(options);

    return request(options).then(data => JSON.parse(data));
}


function getUserDetails(jwt) {
    const Authorization = `Bearer ${jwt}`
    let url = `${config.services.idam_api}/details`;
    let options = {
        url: url,
        method: 'GET',
        headers: {
            'Authorization': Authorization
        }
    };
    options = proxy(options);

    return request(options).then(data => JSON.parse(data));
}


router.use((req, res) => {
    getTokenFromCode(req.query.code).then(data => {
        if(data.access_token) {
            getUserDetails(data.access_token).then(details => {
                console.log(details);
                console.log('-----------------------------');
                res.cookie(config.cookieName, data.access_token);
                res.cookie('__USERID__', details.id);
                res.redirect('/');
            });


        }

    }).catch(e => {
        console.log('error - ', e);
        res.redirect('/');
    });
});


module.exports = router;


