const request = require('request-promise');

module.exports = (method, url, params) => {
    let options = {
        method: method,
        url : url,
        headers : {
            'Content-Type' : 'application/json'
        },
        json : true
    };

    if (params.body) options.body = params.body;

    return request(options);
};
