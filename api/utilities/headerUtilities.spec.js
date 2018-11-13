const headerUtilities = require('./headerUtilities')

describe('headerUtilities', () => {

    const request = {
        auth: {
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJya3Z1cXFycDJtNG4xaGhxOTBxbGJkdT'
        },
        headers: {
            ServiceAuthorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWlfd2ViYXBwIiwiZXhwIjoxNTQyMTMzNzg2fQ'
        }
    };

    const getAuthHeader = (request) => {
        return {
            headers: {
                Authorization: `Bearer ${request.auth.token}`,
                ServiceAuthorization: request.headers.ServiceAuthorization
            }
        }
    };

    it('Should assign the auth token to the header.', () => {
        expect(headerUtilities.getAuthHeaders(request).headers.Authorization).toEqual(
            getAuthHeader(request).headers.Authorization);
    })

    it('Should assign the ServiceAuthorization to the header.', () => {
        expect(headerUtilities.getAuthHeaders(request).headers.ServiceAuthorization).toEqual(
            getAuthHeader(request).headers.ServiceAuthorization);
    })
})
