const config = require('../../config');
const proxy = require('./proxy');
const request = require('request-promise');

module.exports = function generateRequest(url, params) {
    let options = {
        method: 'POST',
        url : url,
        headers : {
            ...params.headers,
            'Content-Type' : 'application/json'
        },
        json : true,
        body: params.body
    };
    if(config.useProxy) {
        options = proxy(options);
    }
    return request(options);
};
