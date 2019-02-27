import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)

import * as ccdStore from '../../../services/ccd-store-api/ccd-store'
import * as coh from '../../../services/coh'
import {init, payload} from './index'

describe('SSCS index', () => {
    describe('init', () => {
        it('Should return hearingId', async () => {
            // @todo - function has unused consts
            const req = {
                auth: {
                    userId: 1,
                },
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 'DIVORCE',
                },
            }
            const res = {}
            const stub = sinon.stub(coh, 'getOrCreateDecision')
            stub.returns(123)
            const result = await init(req, res)
            expect(stub).to.be.called
            expect(stub).to.be.calledWith(123, 1)
            expect(result).to.equal(123)
            stub.restore()
        })
    })
    describe('payload', () => {
        it('Should return undefined with no stateId', async () => {
            const req = {
                auth: {
                    userId: 1,
                },
                params: {
                    caseId: 123,
                    caseTypeId: 'SSCS',
                    jurId: 'SSCS',
                },
            }
            const res = {}
            const data = {}
            const result = await payload(req, res, data)
            // @todo - should an empty state ID return false or null? Or is undefined OK?
            expect(result).to.equal(undefined)
        })
        it('Should return when stateId === \'check-tribunal\'', async () => {
            const req = {
                auth: {
                    userId: 1,
                },
                params: {
                    caseId: 123,
                    caseTypeId: 'SSCS',
                    jurId: 'SSCS',
                    stateId: 'check-tribunal',
                },
            }
            const res = {}
            const data = {1: 1}
            const stub = sinon.stub(coh, 'getOrCreateDecision')
            const stub2 = sinon.stub(coh, 'storeData')
            stub.returns(123)
            stub2.returns(true)
            const result = await payload(req, res, data)
            expect(stub).to.be.calledWith(123, 1)
            expect(stub2).to.be.calledWith(123, {'decisions_SSCS_sscs_123': {1: 1}}, 'decision_issue_pending')
            expect(result).to.equal('decision-confirmation')
            stub.restore()
            stub2.restore()
        })
        it('Should return null when stateId === \'check-final-decision\' and finalDecision fails', async () => {
            const req = {
                auth: {
                    userId: 1,
                },
                params: {
                    caseId: 123,
                    caseTypeId: 'SSCS',
                    jurId: 'SSCS',
                    stateId: 'check-final-decision',
                },
            }
            const stubReturns = {
                eventTokenAndCase: {
                    caseDetails: 0,
                    token: 1,
                },
            }
            const res = {
                send: () => false,
                status: () => false,
            }
            const data = {1: 1}
            const stub = sinon.stub(ccdStore, 'getEventTokenAndCase')
            stub.returns(stubReturns)
            const result = await payload(req, res, data)
            expect(result).to.equal(null)
            stub.restore()
        })
        it('Should return \'decision-confirmation\' when stateId === \'check-final-decision\'', async () => {
            const req = {
                auth: {
                    userId: 1,
                },
                params: {
                    caseId: 123,
                    caseTypeId: 'SSCS',
                    jurId: 'SSCS',
                    stateId: 'check-final-decision',
                },
            }
            const stubReturns = {
                caseDetails: 0,
                token: 1,
            }
            const res = {
                send: () => false,
                status: () => false,
            }
            const data = {1: 1}
            const stub = sinon.stub(ccdStore, 'getEventTokenAndCase')
            stub.resolves(stubReturns)
            const stub2 = sinon.stub(ccdStore, 'postCaseWithEventToken')
            const result = await payload(req, res, data)
            expect(result).to.equal(null)
            stub.restore()
        })
    })
})
