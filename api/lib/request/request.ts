import * as axios from 'axios'
import {config} from '../../../config'

/**
 * TODO: Requires Unit tests as this is used everywhere to make requests to 3rd party
 * services.
 */

export async function request(method: string, url: string, params: any) {
    const headers = params.headers && config.configEnv !== 'mock' ? Object.assign(params.headers) : {}
    const options = {
        body: '',
        formData: '',
        headers: {
            ...headers,
            'Content-Type': (params.headers !== undefined && params.headers['Content-Type'] !== undefined && params.headers['Content-Type'].length) ? params.headers['Content-Type'] : 'application/json',
        },
        json: true,
        method,
        url,
    }

    if (params.body) {
        options.body = params.body
    }
    if (params.formData) {
        options.formData = params.formData
    }

    // if (config.configEnv !== 'mock') {
    //     if (config.useProxy) options = proxy(options)
    // }
    // N.B. Not needed - AJ

    return await axios.default(options)
}
