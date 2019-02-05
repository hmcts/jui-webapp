import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'
import * as request from 'supertest'
import * as app from '../../../dev-server'
import * as state from '../../lib/stateEngine'
import * as sscs from './sscs'

chai.use(sinonChai)

import * as states from './states'

describe('states', () => {
    describe('default export', () => {
        // it('Should respond with 200 status', done => {
        //     request(app)
        //         .get('/state/123/divorce/322/1')
        //         .expect(404, done)
        // })
    })
    describe('handleStateRoute', () => {
        it('Should call process with divorce mapping if jurId === \'DIVORCE\'', async () => {
            const req = {
                params: {
                    caseTypeId: 'Divorce',
                    jurId: 'DIVORCE',
                },
            }
            const res = {}
            const stub = sinon.stub(state, 'process')
            await states.handleStateRoute(req, res)
            expect(stub).to.be.called
            stub.restore()
        })
        it('Should call process with divorce mapping if jurId === \'SSCS\'', async () => {
            const req = {
                params: {
                    caseTypeId: 'SSCS',
                    jurId: 'SSCS',
                },
            }
            const res = {}
            const stub = sinon.stub(state, 'process')
            sinon.stub(sscs, 'init').returns(123)
            await states.handleStateRoute(req, res)
            expect(stub).to.be.called
            stub.restore()
        })
    })
})
