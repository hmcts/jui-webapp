export function shouldReturn() {
    return false
}

export function getAuthHeaders(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    }
}

export function getAuthHeadersWithS2SBearer(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: `Bearer ${req.headers.ServiceAuthorization}`
        }
    }
}

export function getAuthHeadersWithUserRoles(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-roles': req.auth.data
        }
    }
}

export function getAuthHeadersWithUserIdAndRoles(req) {
    return {
        headers: {
            // Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-id': `${req.auth.userId}`,
            'user-roles': `${req.auth.userId}`
        }
    }
}

// TODO: need to deprecate this function
export function getAuthHeadersWithBody(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        },
        body: req.body ? req.body : {}
    }
}
