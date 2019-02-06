import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import {
    getAuthHeaders,
    getAuthHeadersWithBody,
    getAuthHeadersWithS2SBearer,
    getAuthHeadersWithUserIdAndRoles,
    getAuthHeadersWithUserRoles,
    shouldReturn
} from './headerUtilities'

describe('headerUtilities', () => {
    const req = {
        auth: {
            data: 1,
            token: 2,
            userId: 3,
        },
        body: 4,
        headers: {
            ServiceAuthorization: 5,
        },
    }
    describe('shouldReturn', () => {
        it('Should return false', () => {
            const result = shouldReturn()
            expect(result).to.equal(false)
        })
        describe('getAuthHeaders', () => {
            it('Should return headers', () => {
                const result = getAuthHeaders(req)
                expect(result.headers.Authorization).to.equal('Bearer 2')
                expect(result.headers.ServiceAuthorization).to.equal(5)
            })
        })
        describe('getAuthHeadersWithS2SBearer', () => {
            it('Should return headers', () => {
                const result = getAuthHeadersWithS2SBearer(req)
                expect(result.headers.Authorization).to.equal('Bearer 2')
                expect(result.headers.ServiceAuthorization).to.equal('Bearer 5')
            })
        })
        describe('getAuthHeadersWithUserRoles', () => {
            it('Should return headers', () => {
                const result = getAuthHeadersWithUserRoles(req)
                expect(result.headers.Authorization).to.equal('Bearer 2')
                expect(result.headers.ServiceAuthorization).to.equal(5)
                expect(result.headers['user-roles']).to.equal(1)
            })
        })
        describe('getAuthHeadersWithUserIdAndRoles', () => {
            // @todo - user-roles and user-id return same value
            it('Should return headers', () => {
                const result = getAuthHeadersWithUserIdAndRoles(req)
                expect(result.headers.ServiceAuthorization).to.equal(5)
                expect(result.headers['user-id']).to.equal('3')
                expect(result.headers['user-roles']).to.equal('3')
            })
        })
        describe('getAuthHeadersWithBody', () => {
            it('Should return headers', () => {
                const result = getAuthHeadersWithBody(req)
                expect(result.headers.Authorization).to.equal('Bearer 2')
                expect(result.headers.ServiceAuthorization).to.equal(5)
                expect(result.body).to.equal(4)
            })
            it('Should return headers with empty body if none provided', () => {
                const result = getAuthHeadersWithBody({
                    auth: {
                        data: 1,
                        token: 2,
                        userId: 3,
                    },
                    headers: {
                        ServiceAuthorization: 5,
                    },
                })
                expect(result.headers.Authorization).to.equal('Bearer 2')
                expect(result.headers.ServiceAuthorization).to.equal(5)
                expect(result.body).to.be.empty
            })
        })
    })
})
