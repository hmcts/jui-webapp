const config = require('../../../config')
const proxy = require('./proxy')
const request = require('request-promise')

/**
 * TODO: Working out why request is not working correctly to place files.
 */
module.exports = (method, url, params) => {
    // console.log('Request');
    console.log('requestFormData')
    console.log(config.configEnv)

    const headers = (params.headers && config.configEnv !== 'mock') ? Object.assign(params.headers) : {}

    let options = {
        method,
        url,
        headers: {
            ...headers,
            'Content-Type' : params.headers['Content-Type'] || 'application/json'
        }
        // json: true
    }

    // if (params.body) options.body = params.body
    if (params.formData) options.formData = params.formData

    // if (params.multipart) options.multipart = params.multipart

    if (config.configEnv !== 'mock') {
        // gets here as it's local
        if (config.useProxy) options = proxy(options)
    }

    console.log('options');
    console.log(options);

    return request(options)
}
