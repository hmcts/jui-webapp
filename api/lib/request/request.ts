import { config } from '../../../config'
const proxy = require('./proxy')
const request = require('request-promise')

/**
 * TODO: Requires Unit tests as this is used everywhere to make requests to 3rd party
 * services.
 */

//** actually - replace with axios - AJ

module.exports = (method, url, params) => {
    const headers = params.headers && config.configEnv !== 'mock' ? Object.assign(params.headers) : {}

    let options = {
        body: '',
        formData: '',
        method,
        url,
        headers: {
            ...headers,
            'Content-Type': params.headers['Content-Type'] || 'application/json'

        },
        json: true
    }

    if (params.body) options.body = params.body
    if (params.formData) options.formData = params.formData

    // if (config.configEnv !== 'mock') {
    //     if (config.useProxy) options = proxy(options)
    // }
    // N.B. Not needed - AJ

    return request(options)
}
