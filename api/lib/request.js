const config = require('../../config')
const proxy = require('./proxy')
const request = require('request-promise')

module.exports = (method, url, params) => {
    let headers = {}

    if (params.headers && config.configEnv !== 'mock') headers = Object.assign(params.headers)
    let options = {
        method,
        url,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        json: true
    }

    if (params.body) options.body = params.body

    if (config.configEnv !== 'mock') {
        if (config.useProxy) options = proxy(options)
    }

    return request(options)
}
