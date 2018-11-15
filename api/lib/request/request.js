const config = require('../../../config')
const proxy = require('./proxy')
const request = require('request-promise')

/**
 * TODO: Requires Unit tests as this is used everywhere to make requests to 3rd party
 * services.
 *
 * AC:
 * Should pass send on formData to request if params.formData is passed in.
 * Should pass send on body data to request if params.formData is passed in.
 *
 * @param method
 * @param url
 * @param params
 * @return {*}
 */
module.exports = (method, url, params) => {
    // console.log('Request');
    // console.log(params);
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
    if (params.form) options.form = params.form

    // if (params.multipart) options.multipart = params.multipart

    if (config.configEnv !== 'mock') {
        if (config.useProxy) options = proxy(options)
    }

    console.log('options');
    console.log(options);

    return request(options)
}
