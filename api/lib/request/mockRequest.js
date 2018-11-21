const request = require('request-promise')
const extend = require('util')._extend

module.exports = (method, url, params) => {
    const options = {
        method,
        url,
        headers: {
            ...params.headers,
            'Content-Type': 'application/json'
        },
        json: true
    }

    if (params.body) options.body = params.body

    return request(options)
}
