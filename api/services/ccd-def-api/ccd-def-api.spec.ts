import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as express from 'express'
import * as pq from 'proxyquire'
import * as supertest from 'supertest'

chai.use(sinonChai)
const expect = chai.expect
const proxyquire = pq.noPreserveCache()

import { config } from '../../../config'

const url = config.services.ccd_def_api

describe('ccd-def-api spec', () => {
    let route
    let request
    let app
    let httpRequest
    let httpResponse

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({})
        }
        httpRequest = sinon.stub()
        httpRequest.callsFake((url, options) => new Promise(httpResponse))

        app = express()

        route = proxyquire('./ccd-def-api.ts', {
            '../../lib/request/request': httpRequest
        })

        route(app)

        request = supertest(app)
    })

    describe('getHealth', () => {
        let getHealth

        beforeEach(() => {
            getHealth = route.getHealth
        })

        it('should expose function', () => {
            expect(getHealth).to.be.ok
        })

        it('should make a request', () => {
            getHealth({})
            expect(httpRequest).to.have.been.calledWith('GET', `${url}/health`, {})
        })
    })

    describe('getInfo', () => {
        let getInfo

        beforeEach(() => {
            getInfo = route.getInfo
        })

        it('should expose function', () => {
            expect(getInfo).to.be.ok
        })

        it('should make a request', () => {
            getInfo({})
            expect(httpRequest).to.have.been.calledWith('GET', `${url}/info`, {})
        })
    })

    describe('getJurisdictions', () => {
        let getJurisdictions

        beforeEach(() => {
            getJurisdictions = route.getJurisdictions
        })

        it('should expose function', () => {
            expect(getJurisdictions).to.be.ok
        })

        it('should make a request', () => {
            getJurisdictions({})
            expect(httpRequest).to.have.been.calledWith('GET', `${url}/api/data/jurisdictions`, {})
        })
    })

    describe('getCaseTypes', () => {
        let getCaseTypes

        beforeEach(() => {
            getCaseTypes = route.getCaseTypes
        })

        it('should expose function', () => {
            expect(getCaseTypes).to.be.ok
        })

        // it('should make a request', () => {
        //     const jurisdictions = 'jud'
        //     getCaseTypes(`${jurisdictions}`, {})
        //     expect(httpRequest).to.have.been.calledWith('GET', `${url}/api/data/jurisdictions/${jurisdictions}/case-type`, {})
        // })
    })
})
