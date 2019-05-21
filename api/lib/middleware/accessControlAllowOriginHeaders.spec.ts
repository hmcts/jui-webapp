/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { accessControlAllowOriginHeaders } from './accessControlAllowOriginHeaders'

chai.use(sinonChai)
describe('Middleware - accessControlAllowOriginHeaders', () => {
    it('should set the appropriate headers', () => {
        const req = mockReq()
        const res = mockRes({
            setHeader: sinon.spy(),
        })
        const next = sinon.spy()
        accessControlAllowOriginHeaders(req, res, next)
        expect(next).to.have.been.called
        expect(res.setHeader).to.have.been.calledWith('Access-Control-Allow-Origin', '*')
    })
})
