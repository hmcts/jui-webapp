const request = require('request-promise')
var extend = require('util')._extend
module.exports = (method, url, params) => {
    let options = {
        method: method,
        url: url,
        headers: {
            ...params.headers,
            'Content-Type': 'application/json'
        },
        json: true
    }

    if (params.body) options.body = params.body

    return request(options)
}
