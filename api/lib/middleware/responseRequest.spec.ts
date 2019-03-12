import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as log4js from 'log4js'
import * as responseRequest from './responseRequest'

describe('responseRequest', () => {
    describe('setReqRes', () => {
        it('Should set the request and response objects', () => {
            const req = mockReq({})
            const res = mockRes()

            responseRequest.default(req, res, () => { })
            expect(responseRequest.response()).to.not.equal(null))
    })
})
})
