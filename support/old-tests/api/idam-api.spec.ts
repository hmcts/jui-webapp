import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as express from 'express'
import * as pq from 'proxyquire'
import * as supertest from 'supertest'

chai.use(sinonChai)
const expect = chai.expect
const assert = chai.assert
const proxyquire = pq.noPreserveCache()

import {config} from '../../../config'

const url = config.services.idam_api

describe('idam-api spec', () => {
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

        route = proxyquire('./idam-api.ts', {
            '../../lib/http': httpRequest
        })

        route(app)

        request = supertest(app)
    })

    // describe('getHealth', () => {
    //     let getHealth

    //     beforeEach(() => {
    //         getHealth = route.getHealth
    //     })

    //     it('should expose function', () => {
    //         expect(getHealth).to.be.ok
    //     })

    //     it('should make a request', () => {
    //         getHealth({})
    //         expect(httpRequest).to.have.been.calledWith('GET', `${url}/health`, {})
    //     })
    // })

    // describe('getInfo', () => {
    //     let getInfo

    //     beforeEach(() => {
    //         getInfo = route.getInfo
    //     })

    //     it('should expose function', () => {
    //         expect(getInfo).to.be.ok
    //     })

    //     it('should make a request', () => {
    //         getInfo({})
    //         expect(httpRequest).to.have.been.calledWith('GET', `${url}/info`, {})
    //     })
    // })

    describe('getDetails', () => {
        let getDetails

        beforeEach(() => {
            getDetails = route.getDetails
        })

        it('should expose function', () => {
            expect(getDetails).to.be.ok
        })

        // it('should make a request', async () => {
        //     await getDetails()
        //     expect(httpRequest).to.have.been.calledWith(`${url}/details`)
        // })
    })

    describe('postOauthToken', () => {
        let postOauthToken

        beforeEach(() => {
            postOauthToken = route.postOauthToken
        })

        it('should expose function', () => {
            expect(postOauthToken).to.be.ok
        })

        // need to figure out how to fake otp
        xit('should make a request', () => {
            const code = 'abc12345'
            const host = 'fakehost'
            postOauthToken(code, host)
            expect(httpRequest).to.have.been.calledWith(
                'POST',
                `${url}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=http://${host}/oauth2/callback`,
                {
                    Authorization: 'Basic anVpd2ViYXBwOkFBQUFBQUFBQUFBQUFBQUE=',
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
        })
    })
})
