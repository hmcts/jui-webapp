import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as log4js from 'log4js'
import * as log4jui from '../lib/log4jui'
import { isJUILogger, JUILogger } from '../lib/models'

describe('log4jui', () => {
    describe('getLogger', () => {
        it('Should  return an instance of JUILogger', () => {
            expect(isJUILogger(log4jui.getLogger(''))).to.equal(true)
        })
        it('Should return an instance of JUILogger containing a log4jui logger ', () => {
            expect((log4jui.getLogger('test')._logger as any).category).to.equal('test')
        })
    })

    describe('warn', () => {
        it('should log a warn with log4js', async () => {

            const spy = sinon.spy()
            const stub = sinon.stub(log4js, 'getLogger')
            stub.returns({ warn: spy })

            const logger = log4jui.getLogger('test')
            logger.warn('warning')

            expect(spy).to.be.calledWith('warning')
            stub.restore()
        })
    })

    describe('info', () => {
        it('should log a info with log4js', async () => {

            const spy = sinon.spy()
            const stub = sinon.stub(log4js, 'getLogger')
            stub.returns({ info: spy })

            const logger = log4jui.getLogger('test')
            logger.info('warning')

            expect(spy).to.be.calledWith('warning')
            stub.restore()
        })
    })

    describe('error', () => {
        it('should log a info with log4js', async () => {

            const spy = sinon.spy()
            const stub = sinon.stub(log4js, 'getLogger')
            stub.returns({ error: spy })

            const logger = log4jui.getLogger('test')
            logger.error('warning')

            expect(spy).to.be.calledWith('warning')
            stub.restore()
        })
    })
})
