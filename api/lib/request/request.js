const config = require('../../../config')
const proxy = require('./proxy')
const request = require('request-promise')

module.exports = (method, url, params) => {
    console.log('Request');
    const headers = (params.headers && config.configEnv !== 'mock') ? Object.assign(params.headers) : {}

    let options = {
        method,
        url,
        headers: {
            ...headers,
            'Content-Type' : params.headers['Content-Type'] || 'application/json'
        },
        json: true
    }

    if (params.body) options.body = params.body

    // if (params.multipart) options.multipart = params.multipart

    if (config.configEnv !== 'mock') {
        if (config.useProxy) options = proxy(options)
    }

    // TODO: it's coming back here with a
    // str.replace is not a function,
    // therefore it's not doing the call for
    // multiform

    console.log('options');
    console.log(options);

    return request(options)
}
