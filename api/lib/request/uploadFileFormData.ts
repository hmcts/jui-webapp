const request = require('request-promise')

// TODO: Hook this into logging
export async function uploadFormDataUsingRequest(url, formData, headers) {

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
