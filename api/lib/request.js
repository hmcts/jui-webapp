const config = require('../../config');
const proxy = require('./proxy');
const request = require('request-promise');

module.exports = function generateRequest(url, params) {
    let options = {
        url : url, headers : {
            ...params.headers,
            'Content-Type' : 'application/json'
        }, json : true
    };
    if(config.useProxy) {
        options = proxy(options);
    }
    return request(options);
};
