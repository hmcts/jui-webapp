import * as chai from 'chai'
import { expect } from 'chai'
import * as express from 'express'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { config } from '../../config'
import * as util from '../lib/util'
import * as bar from './bar'

chai.use(sinonChai)

describe('getHealthRoute', () => {

    let sandbox
    const result = {
        test: true,
    }
    const req = mockReq()
    const res = mockRes()
    const url = config.services.bar_api

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should call getHealth', async () => {
        sandbox.stub(util, 'getHealth').resolves(result)
        await bar.getHealthRoute(req, res)
        expect(util.getHealth).to.have.been.calledWith(url)
        expect(res.status).to.have.been.calledWith(200)
        expect(res.send).to.have.been.calledWith(result)
    })

    it('should call getInfo', async () => {
        sandbox.stub(util, 'getInfo').resolves(result)
        await bar.getInfoRoute(req, res)
        expect(util.getInfo).to.have.been.calledWith(url)
        expect(res.status).to.have.been.calledWith(200)
        expect(res.send).to.have.been.calledWith(result)
    })

    it('should create the appropriate routes', () => {
        const app = {
            use: sandbox.spy(),
        }
        sandbox.stub(express.Router, 'get')
        bar.default(app)
        expect(app.use).to.have.been.calledWith('/bar')
        expect(express.Router.get).to.have.been.calledWith('/health', bar.getHealthRoute)
        expect(express.Router.get).to.have.been.calledWith('/info', bar.getInfoRoute)
    })
})
