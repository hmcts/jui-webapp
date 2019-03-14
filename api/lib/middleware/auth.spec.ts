import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

import * as jwt from 'jsonwebtoken'

chai.use(sinonChai)

import { logout } from '../../controllers/auth'
import * as idam from '../../services/idam'
import * as auth from './auth'

import * as responseRequest from './responseRequest'

describe('auth', () => {
    describe('validRoles', () => {
        it('should return true if a give roles match jui pannel member or judge roles', () => {
            expect(auth.validRoles(['jui-judge'])).to.equal(true)
            expect(auth.validRoles(['jui-panelmember'])).to.equal(true)
        })
        it('should return false if given roles do not match jui pannel member or judge roles', () => {
            expect(auth.validRoles(['test'])).to.equal(false)
        })
    })

    describe('default', () => {
        it('should call user details if session  does not contain user details', async () => {

            const req = mockReq({
                cookies: [],
                headers: [],

            })

            const res = mockRes()

            // lets set the expiry to be tomorrow
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + 1)
            // this should be able to decoded by jwtdecode
            const token = jwt.sign({ exp: expiry.getTime() }, 'test')
            req.headers.authorization = token
            const stub = sinon.stub(idam, 'getDetails')
            const stub2 = sinon.stub(auth, 'validRoles')

            stub.returns(Promise.resolve({
                roles: []
            }))

            stub2.returns(true)

            await auth.default(req, res, () => { })
            expect(stub).to.be.called
            stub.restore()

        })
        it('should log the user out if token has expired', async () => {

            const req = mockReq({
                cookies: [],
                headers: [],

            })

            const res = mockRes()

            // lets set the expiry to be tomorrow
            const expiry = new Date();
            expiry.setDate(expiry.getDate() - 1)
            // this should be able to decoded by jwtdecode
            const token = jwt.sign({ exp: expiry.getTime() }, 'test')
            req.headers.authorization = token
            const stub = sinon.stub(auth, 'getDetails')
            const stub2 = sinon.stub(auth, 'validRoles')

            stub.returns(Promise.resolve({
                roles: []
            }))

            stub2.returns(true)

            await auth.default(req, res, () => { })
            expect(stub).to.be.called
            stub.restore()
            stub2.restore()
        })
    })
})
