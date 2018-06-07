const otp = require('otp');
const jwtDecode = require('jwt-decode');
const request = require('request');
const proxy = require('./proxy');
const config = require('../../config/index');

const microservice = config.microservice;
const secret = process.env.S2S_SECRET || 'AAAAAAAAAAAAAAAA';
let _cache = {};


function validateCache() {
    const currentTime = Math.floor(Date.now() / 1000);
    if (!_cache[microservice]) return false;
    return currentTime < _cache[microservice].expiresAt;
}

function getToken() {
    return _cache[microservice];
}


function generateToken() {
    const oneTimePassword = otp({secret: secret}).totp();
    let options = {
        url: `${config.services.s2s}/lease`,
        method: 'POST',
        body: {
            oneTimePassword: oneTimePassword,
            microservice: microservice
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }

    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            console.log(err);
            console.log(res.statusCode);

            console.log(body);

            const tokenData = jwtDecode(body);
            _cache[microservice] = {
                expiresAt: tokenData.exp,
                token: body
            };
            console.log(tokenData);
            resolve();
        });
    });
}


function serviceTokenGenerator() {
    return new Promise((resolve, reject) => {

        if (validateCache()) {
            resolve(getToken());
        }
        else {
            generateToken().then(() => {
                resolve(getToken());
            })
        }
    });
}

module.exports = serviceTokenGenerator;
