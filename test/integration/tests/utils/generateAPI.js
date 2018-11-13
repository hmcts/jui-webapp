const request = require('request-promise');
const should = require('should');

const mainURL = process.env.TEST_URL || 'https://localhost:3000';
const LOG_REQUEST_ERROR_DETAILS = false;
const getCookie = require('./getToken');
let cookie ;

async function generateAPIRequest(method, subURL, params) {

    await getCookie.getOauth2Token().then(function (token) {
        cookie= token ;
    });

    const options = {
        method,
        url: mainURL + subURL,

        headers: {
            Cookie: '__auth__=' + cookie,
            'Content-Type': 'application/json'
        },
        json: true,
        resolveWithFullResponse: true
    };

    if (params.body) options.body = params.body;

    const requestPromise = request(options);
    if (LOG_REQUEST_ERROR_DETAILS) {
        requestPromise.catch(error => console.log(error.response.body, 'ERROR !'));
    }
    return requestPromise;
}

function generateAPIRequestForFR(method, subURL, params) {
    return generateAPIRequest(method, subURL, params);
}

module.exports.generateAPIRequestForFR = generateAPIRequestForFR;
