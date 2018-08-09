const otp = require('otp');
const jwtDecode = require('jwt-decode');
const request = require('request-promise');
const proxy = require('./proxy');
const config = require('../../config/index');

const microservice = config.microservice;
const annotationAccessorMicroservice = config.annotationAccessorMicroservice;
const secret = process.env.JUI_S2S_SECRET || 'AAAAAAAAAAAAAAAA';
const annotationAccessorSecret = process.env.ANNOTATION_ACCESSOR_API_SECRET || 'AAAAAAAAAAAAAAAA';
const microServiceMapping = {};

microServiceMapping[microservice] = secret;
microServiceMapping[annotationAccessorMicroservice] = annotationAccessorSecret;

const _cache = {};


function validateCache(aRequest) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (!_cache[getMicroservice(aRequest)]) return false;
    return currentTime < _cache[getMicroservice(aRequest)].expiresAt;
}

function getToken(aRequest) {
    return _cache[getMicroservice(aRequest)];
}

function getMicroservice(aRequest) {
    return aRequest.url.indexOf('/annotation') >=0  ? annotationAccessorMicroservice : microservice;
}

function generateToken(aRequest) {

    const aMicroServiceName = getMicroservice(aRequest);

    const oneTimePassword = otp({ 'secret': microServiceMapping[aMicroServiceName] }).totp();

    let options = {
        url: `${config.services.s2s}/lease`,
        method: 'POST',
        body: {
            'oneTimePassword':oneTimePassword,
            'microservice':aMicroServiceName
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }

    return new Promise((resolve, reject) => {
        request(options).then(body => {
            const tokenData = jwtDecode(body);
            _cache[aMicroServiceName] = {
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


function serviceTokenGenerator(aRequest) {
    return new Promise((resolve, reject) => {
        if (validateCache(aRequest)) {
            resolve(getToken(aRequest));
        } else {
            generateToken(aRequest).then(() => {
                resolve(getToken(aRequest));
            })
                .catch(e => {
                    console.log('Failed to get S2S token');
                    reject();
                });
        }
    });
}

module.exports = serviceTokenGenerator;
