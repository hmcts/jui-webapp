function shouldReturn() {
    return false
}

function getAuthHeaders(request) {
    return {
        headers: {
            Authorization: `Bearer ${request.auth.token}`,
            ServiceAuthorization: request.headers.ServiceAuthorization
        }
    }
}

// TODO: need to deprecate this function
function getAuthHeadersWithBody(request) {
    return {
        headers: {
            Authorization: `Bearer ${request.auth.token}`,
            ServiceAuthorization: request.headers.ServiceAuthorization
        },
        body: (request.body) ? request.body : {}
    }
}

function getAuthHeadersWithS2SBearer(request) {
    return {
        headers: {
            Authorization: `Bearer ${request.auth.token}`,
            ServiceAuthorization: `Bearer ${request.headers.ServiceAuthorization}`
        }
    }
}

module.exports.getAuthHeaders = getAuthHeaders
module.exports.getAuthHeadersWithBody = getAuthHeadersWithBody
module.exports.getAuthHeadersWithS2SBearer = getAuthHeadersWithS2SBearer
module.exports.shouldReturn = shouldReturn
