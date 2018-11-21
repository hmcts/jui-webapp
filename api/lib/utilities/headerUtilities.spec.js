const headerUtilities = require('./headerUtilities')

describe('headerUtilities', () => {
    const CONST_BEARER = 'Bearer'
    const idamJwt = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJya3Z1cXFycDJtNG4xaGhxOTBxbGJkdT'
    const s2sJwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWlfd2ViYXBwIiwiZXhwIjoxNTQyMTMzNzg2fQ'

    const request = {
        auth: {
            token: idamJwt
        },
        headers: {
            ServiceAuthorization: s2sJwt
        }
    }

    const body = {
        bob: 'bob'
    }

    describe('when i use getAuthHeaders', () => {
        it('Should assign the auth token to the header.', () => {
            expect(headerUtilities.getAuthHeaders(request).headers.Authorization)
                .toEqual(`${CONST_BEARER} ${idamJwt}`)
        })

        it('Should assign the ServiceAuthorization to the header. Without Bearer token.', () => {
            expect(headerUtilities.getAuthHeaders(request).headers.ServiceAuthorization)
                .toEqual(`${s2sJwt}`)
        })
    })

    describe('when i use getAuthHeadersWithS2SBearer', () => {
        it('Should assign the auth token to the header.', () => {
            expect(headerUtilities.getAuthHeadersWithS2SBearer(request).headers.Authorization)
                .toEqual(`${CONST_BEARER} ${idamJwt}`)
        })

        it('Should assign the ServiceAuthorization to the header. With Bearer token.', () => {
            expect(headerUtilities.getAuthHeadersWithS2SBearer(request).headers.ServiceAuthorization)
                .toEqual(`${CONST_BEARER} ${s2sJwt}`)
        })
    })

    describe('when i use getAuthHeadersWithBody', () => {
        describe('when a body is not there', () => {
            beforeEach(() => {
            })

            it('Should assign the auth token to the header.', () => {
                expect(headerUtilities.getAuthHeadersWithBody(request).headers.Authorization)
                    .toEqual(`${CONST_BEARER} ${idamJwt}`)
            })

            it('Should assign the ServiceAuthorization to the header.', () => {
                expect(headerUtilities.getAuthHeadersWithBody(request).headers.ServiceAuthorization)
                    .toEqual(`${s2sJwt}`)
            })

            it('Should assign the body to the header.', () => {
                expect(headerUtilities.getAuthHeadersWithBody(request).body)
                    .toEqual({})
            })
        })

        describe('when a body is there', () => {
            beforeEach(() => {
                request.body = body
            })

            it('Should assign the auth token to the header.', () => {
                expect(headerUtilities.getAuthHeadersWithBody(request).headers.Authorization)
                    .toEqual(`${CONST_BEARER} ${idamJwt}`)
            })

            it('Should assign the ServiceAuthorization to the header.', () => {
                expect(headerUtilities.getAuthHeadersWithBody(request).headers.ServiceAuthorization)
                    .toEqual(`${s2sJwt}`)
            })

            it('Should assign the body to the header.', () => {
                expect(headerUtilities.getAuthHeadersWithBody(request).body)
                    .toEqual(body)
            })
        })
    })
})
