import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

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
})
