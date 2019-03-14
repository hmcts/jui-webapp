import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)
// below this line you  ut imports to do with our code. Above this line are all testing i ports
import * as log4js from 'log4js'

import * as securityHeaders from './securityHeaders'

describe('securityHeader', () => {
    const req = mockReq({})
    describe('noCache', () => {
        it('Should set the correct headers', () => {
            // console.log(req)
            const spy = { setHeader: sinon.spy() }
            securityHeaders.nocache(spy)
            expect(spy.setHeader).to.have.been.calledWith('Surrogate-Control', 'no-store')
            expect(spy.setHeader).to.have.been.calledWith('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
            expect(spy.setHeader).to.have.been.calledWith('Pragma', 'no-cache')
            expect(spy.setHeader).to.have.been.calledWith('Expires', '0')
        })
    })
    describe('hidePoweredBy', () => {
        it('Should set the correct headers', () => {
            const spy = {
                app: {
                    disable: sinon.spy(),
                },
                removeHeader: sinon.spy()
            }
            securityHeaders.hidePoweredBy(spy)
            expect(spy.app.disable).to.have.been.calledWith('x-powered-by')
            expect(spy.removeHeader).to.have.been.calledWith('Server')
        })
    })
    describe('frameguard', () => {
        it('Should set the correct headers', () => {
            const spy = { setHeader: sinon.spy() }
            securityHeaders.frameguard(spy)
            expect(spy.setHeader).to.have.been.calledWith('X-Frame-Options', 'SAMEORIGIN')
        })
    })

    describe('securityHeaders', () => {
        it('Should call all methods in securityHeaders', () => {

            const sandbox = sinon.createSandbox()
            sandbox.stub(securityHeaders, 'frameguard')
            sandbox.stub(securityHeaders, 'nocache')
            sandbox.stub(securityHeaders, 'hidePoweredBy')

            const req = mockReq()
            const res = mockRes()
            const spy = sinon.spy()

            securityHeaders.securityHeaders(req, res, spy )

            expect(securityHeaders.frameguard).to.have.been.called
            expect(securityHeaders.nocache).to.have.been.called
            expect(securityHeaders.hidePoweredBy).to.have.been.called


            sandbox.restore()

        })
    })
})
