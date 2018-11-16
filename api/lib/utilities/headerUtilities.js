function shouldReturn() {
    return false
}

function getAuthHeaders(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    }
}

function getAuthHeadersWithUserRoles(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-roles': req.auth.data
        }
    }
}

// TODO: need to deprecate this function
function getAuthHeadersWithBody(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        },
        body: (req.body) ? req.body : {}
    }
}

function getAuthHeadersWithS2SBearer(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: `Bearer ${req.headers.ServiceAuthorization}`
        }
    }
}

module.exports.getAuthHeaders = getAuthHeaders
module.exports.getAuthHeadersWithUserRoles = getAuthHeadersWithUserRoles
module.exports.getAuthHeadersWithBody = getAuthHeadersWithBody
module.exports.getAuthHeadersWithS2SBearer = getAuthHeadersWithS2SBearer
module.exports.shouldReturn = shouldReturn
