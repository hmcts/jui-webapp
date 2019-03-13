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
import * as headerHelpers from '../utilities/headerHelpers'
import * as idam from '../../services/idam';


describe('securityHeader', () => {

    describe('securityHeaders', () => {
        it('Should call all methods in securityHeaders', () => {

            const sandbox = sinon.createSandbox()
            sandbox.stub(headerHelpers, 'frameguard')
            sandbox.stub(headerHelpers, 'nocache')
            sandbox.stub(headerHelpers, 'hidePoweredBy')

            const req = mockReq()
            const res = mockRes()
            const spy = sinon.spy()

            securityHeaders.securityHeaders(req, res, spy );

            expect(headerHelpers.frameguard).to.have.been.called
            expect(headerHelpers.nocache).to.have.been.called
            expect(headerHelpers.hidePoweredBy).to.have.been.called


            sandbox.restore()
            
        })
    })
})
