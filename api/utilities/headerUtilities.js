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

module.exports.getAuthHeaders = getAuthHeaders
module.exports.shouldReturn = shouldReturn
