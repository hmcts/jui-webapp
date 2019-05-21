/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import * as express from 'express'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { accessControlAllowOriginHeaders } from '../../lib/middleware/accessControlAllowOriginHeaders'
import * as coh from '../../services/coh'
import * as cohQA from '../../services/cohQA'
import * as cohDecisions from './cohDecisions'

chai.use(sinonChai)
describe('Decisions - cohDecisions', () => {
    let sandbox
    const reqParams = {
        auth: {
            userId: 1,
        },
        params: {
            caseId: 1,
        },
    }
    const req = mockReq(reqParams)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(cohQA, 'getHearingIdOrCreateHearing').resolves(1)
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('getDecisionForCase', () => {
        it('success', async () => {
            const expected = {
                data: true,
            }
            sandbox.stub(cohQA, 'getDecision').resolves(expected)
            await cohDecisions.getDecisionForCase(req, res)
            expect(res.status).to.be.calledWith(201)
            expect(res.send).to.be.calledWith(expected)
        })

        it('error', async () => {
            const error = {
                message: 'not found',
                statusCode: 404,
            }
            sandbox.stub(cohQA, 'getDecision').throws(error)
            await cohDecisions.getDecisionForCase(req, res)
            expect(res.status).to.be.calledWith(error.statusCode)
            expect(res.send).to.be.calledWith(error.message)
        })
    })

    describe('postDecisionForCase', () => {

        it('success', async () => {
            const expected = {
                data: true,
            }
            sandbox.stub(cohQA, 'postDecision').resolves(expected)
            await cohDecisions.postDecisionForCase(req, res)
            expect(res.status).to.be.calledWith(201)
            expect(res.send).to.be.calledWith(expected)
        })

        it('error', async () => {
            const error = { statusCode: 404, message: 'not found' }
            sandbox.stub(cohQA, 'postDecision').throws(error)
            await cohDecisions.postDecisionForCase(req, res)
            expect(res.status).to.be.calledWith(error.statusCode)
            expect(res.send).to.be.calledWith(error.message)
        })

    })

    describe('putDecisionForCase', () => {

        it('success', async () => {
            const expected = {
                data: true,
            }
            sandbox.stub(cohQA, 'putDecision').resolves(expected)
            await cohDecisions.putDecisionForCase(req, res)
            expect(res.status).to.be.calledWith(200)
            expect(res.send).to.be.calledWith(expected)
        })

        it('error', async () => {
            const error = { statusCode: 404, message: 'not found' }
            sandbox.stub(cohQA, 'putDecision').throws(error)
            await cohDecisions.putDecisionForCase(req, res)
            expect(res.status).to.be.calledWith(error.statusCode)
            expect(res.send).to.be.calledWith(error.message)
        })
    })


    describe('getCaseHearings', () => {

        it('success', async () => {
            const expected = {
                data: true,
            }
            sandbox.stub(coh, 'getHearingByCase').resolves(expected)
            await cohDecisions.getCaseHearings(req, res)
            expect(res.status).to.be.calledWith(200)
            expect(res.send).to.be.calledWith(expected)
        })

        it('error', async () => {
            const error = { status: 400, message: 'error' }
            sandbox.stub(coh, 'getHearingByCase').throws(error)
            await cohDecisions.getCaseHearings(req, res)
            expect(res.status).to.be.calledWith(error.status)
            expect(res.send).to.be.calledWith(error)
        })

    })

    describe('relistHearingForCase', () => {

        it('success', async () => {
            const expected = {
                data: true,
                status: 200,
            }
            sandbox.stub(coh, 'relistHearing').resolves(expected)
            await cohDecisions.relistHearingForCase(req, res)
            expect(res.status).to.be.calledWith(200)
            expect(res.send).to.be.calledWith(expected.data)
        })

        it('error from service', async () => {
            const error = { serviceError: { status: 400, message: 'error' } }
            sandbox.stub(coh, 'relistHearing').throws(error)
            await cohDecisions.relistHearingForCase(req, res)
            expect(res.status).to.be.calledWith(error.serviceError.status)
            expect(res.send).to.be.calledWith(error.serviceError.message)
        })

        it('error', async () => {
            const error = { status: 400, message: 'error' }
            sandbox.stub(coh, 'relistHearing').throws(error)
            await cohDecisions.relistHearingForCase(req, res)
            expect(res.status).to.be.calledWith(error.status)
            expect(res.send).to.be.calledWith(error)
        })

    })

    it('should create the appropriate routes', () => {
        const app = {
            use: sandbox.spy(),
        }
        sandbox.stub(express.Router, 'get')
        sandbox.stub(express.Router, 'put')
        sandbox.stub(express.Router, 'post')
        cohDecisions.default(app)
        expect(app.use).to.have.been.calledWith('/decisions', accessControlAllowOriginHeaders)
        expect(express.Router.get).to.have.been.calledWith('/:case_id', cohDecisions.getDecisionForCase)
        expect(express.Router.post).to.have.been.calledWith('/:case_id', cohDecisions.postDecisionForCase)
        expect(express.Router.put).to.have.been.calledWith('/:case_id', cohDecisions.putDecisionForCase)

        expect(express.Router.get).to.have.been.calledWith('/:case_id/hearing', cohDecisions.getCaseHearings)
        expect(express.Router.put).to.have.been.calledWith('/:case_id/hearing/relist', cohDecisions.relistHearingForCase)
    })

})
