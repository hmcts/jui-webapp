/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import * as express from 'express'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as stateEngine from '../../lib/stateEngine'
import { Store } from '../../lib/store/store'
import * as coh from '../../services/coh'
import * as divorce from './divorce'
import * as sscs from './sscs'
import * as states from './states'

chai.use(sinonChai)
describe('Decisions - states', () => {
    let sandbox
    const reqParams = {
        auth: {
            userId: 1,
        },
        params: {
            caseTypeId: 'divorce',
            jurId: 'DIVORCE',
        },
    }
    let req = mockReq(reqParams)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(stateEngine, 'process')
        sandbox.stub(sscs, 'init').returns(1)
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should call process with the correct params for divorce', async () => {
        await states.handleStateRoute(req, res)
        expect(stateEngine.process).to.be.calledWith(
            req,
            res,
            divorce.mapping[reqParams.params.caseTypeId],
            divorce.payload[reqParams.params.caseTypeId],
            divorce.templates,
            new Store(req)
        )
    })

    it('should call process with the correct params for sscs', async () => {
        reqParams.params.caseTypeId = 'SSCS'
        reqParams.params.jurId = 'SSCS'
        req = mockReq(reqParams)
        await states.handleStateRoute(req, res)
        expect(stateEngine.process).to.be.calledWith(
            req,
            res,
            sscs.mapping,
            sscs.payload,
            sscs.templates,
            new coh.Store(1)
        )
    })

    it('should create the appropriate routes', () => {
        const app = {
            use: sandbox.spy(),
        }
        sandbox.stub(express.Router, 'get')
        sandbox.stub(express.Router, 'post')
        states.default(app)
        expect(app.use).to.have.been.calledWith('/decisions')
        expect(express.Router.get).to.have.been.calledWith('/state/:jurId/:caseTypeId/:caseId/:stateId', states.handleStateRoute)
        expect(express.Router.post).to.have.been.calledWith('/state/:jurId/:caseTypeId/:caseId/:stateId', states.handleStateRoute)
    })

})
