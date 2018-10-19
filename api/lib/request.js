const config = require('../../config');
const proxy = require('./proxy');
const request = require('request-promise');

module.exports = (method, url, params) => {
    let options = {
        method: method,
        url : url,
        headers : {
            ...params.headers,
            'Content-Type' : 'application/json'
        },
        json : true
    };
    
    if (params.body) options.body = params.body;
    
    if(config.useProxy) options = proxy(options);
    
    return request(options);
};
