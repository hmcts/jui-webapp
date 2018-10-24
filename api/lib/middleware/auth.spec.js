const proxyquire = require('proxyquire')

describe('Auth middleware', () => {
    let expiryDate
    let authMiddleware

    beforeEach(() => {
        authMiddleware = proxyquire('./auth', {
            'jwt-decode': () => {
                return { exp: expiryDate }
            },
            '../../../config': {
                cookies: {
                    userId: 'user_key',
                    token: 'token_cookie'
                }
            }
        })
    })

    afterEach(() => {
        proxyquire.preserveCache()
    })

    describe('Headers and cookies', () => {
        let req = {}
        const res = {}
        const next = function() {
        }
        beforeEach(() => {
            req = {
                cookies: {
                    user_key: 'cookie_user',
                    token_cookie: 'cookie_token'
                },
                headers: {
                    user_key: 'header_user',
                    authorization: 'header_token'
                }
            }
        })

        it('should be able to extract cookie values', () => {
            expiryDate = new Date().getTime() + 5000
            req.headers = {}
            authMiddleware(req, res, next)
            expect(req.auth).toEqual({
                exp: expiryDate,
                token: 'cookie_token',
                userId: 'cookie_user'
            })
        })

        it('should be able to extract headers', () => {
            expiryDate = new Date().getTime() + 5000
            req.cookies = {}
            authMiddleware(req, res, next)
            expect(req.auth).toEqual({
                exp: expiryDate,
                token: 'header_token',
                userId: 'header_user'
            })
        })

        it('should prioritise reading headers', () => {
            expiryDate = new Date().getTime() + 5000
            req.cookies = {}
            authMiddleware(req, res, next)
            expect(req.auth).toEqual({
                exp: expiryDate,
                token: 'header_token',
                userId: 'header_user'
            })
        })
    })
})
