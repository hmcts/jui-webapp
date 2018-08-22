const otp = require('otp');
const jwtDecode = require('jwt-decode');
const request = require('request-promise');
const proxy = require('./proxy');
const config = require('../../config/index');

const microservice = config.microservice;
const secret = process.env.JUI_S2S_SECRET || 'AAAAAAAAAAAAAAAA';
const _cache = {};


function validateCache() {
    const currentTime = Math.floor(Date.now() / 1000);
    if (!_cache[microservice]) return false;
    return currentTime < _cache[microservice].expiresAt;
}

function getToken() {
    return _cache[microservice];
}


function generateToken() {
    const oneTimePassword = otp({ secret }).totp();
    let options = {
        url: `${config.services.s2s}/lease`,
        method: 'POST',
        body: {
            oneTimePassword,
            microservice
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }

    return new Promise((resolve, reject) => {
        request(options).then(body => {
            const tokenData = jwtDecode(body);
            _cache[microservice] = {
                expiresAt: tokenData.exp,
                token: body
            };
            resolve();
        })
            .catch(e => {
                console.log('Error creating S2S token! S2S service error - ', e.message);
                reject();
            });
    });
}


function serviceTokenGenerator() {
    return new Promise((resolve, reject) => {
        if (validateCache()) {
            resolve(getToken());
        } else {
            generateToken().then(() => {
                resolve(getToken());
            })
                .catch(e => {
                    console.log('Failed to get S2S token');
                    reject();
                });
        }
    });
}

module.exports = serviceTokenGenerator;
