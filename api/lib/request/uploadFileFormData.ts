const request = require('request-promise')
// import * as request from 'request-promise'
import {createReadStream} from 'fs'

/**
 * getClassification
 *
 * If classification has not been entered, we assume that it is public.
 *
 * @param {String} classification - 'RESTRICTED'
 * @return {String}
 */
export function getClassification(classification) {
    return classification || 'PUBLIC'
}

/**
 * uploadFormDataUsingRequest
 *
 * We are using promise-request over Axios here, as it's hard to upload file data within a form
 * via Axios. In addition Upload feature is highly likely to be dropped after v1.0, therefore
 * we can deprecate the use of promise-request after this.
 *
 * TODO: Hook this into logging
 *
 * @param url
 * @param file
 * @param classification
 * @param headers
 * @return {Promise<any>}
 */
export async function uploadFormDataUsingRequest(url, file, classification, headers) {

    const formData = {
        classification: getClassification(classification),
        files: [
            {
                options: {filename: file.name, contentType: file.type},
                value: createReadStream(file.path),
            },
        ],
    }

    const options = {
        body: '',
        formData,
        headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
        },
        method: `POST`,
        url,
    }

    return request(options)
}

module.exports = uploadFormDataUsingRequest
