const proxyquire = require('proxyquire').noPreserveCache()
const supertest = require('supertest')
const express = require('express')
const config = require('../../../config')

const url = config.services.s2s

describe('service-auth-provider-api spec', () => {
    let route
    let request
    let app
    let httpRequest
    let httpResponse

    beforeEach(() => {
        httpResponse = (resolve, reject) => {
            resolve({})
        }
        httpRequest = jasmine.createSpy()
        httpRequest.and.callFake((url, options) => new Promise(httpResponse))

        app = express()

        route = proxyquire('./service-auth-provider-api.js', {
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
            expect(getHealth).toBeTruthy()
        })

        it('should make a request', () => {
            getHealth({})
            expect(httpRequest).toHaveBeenCalledWith('GET', `${url}/health`, {})
        })
    })

    describe('getInfo', () => {
        let getInfo

        beforeEach(() => {
            getInfo = route.getInfo
        })

        it('should expose function', () => {
            expect(getInfo).toBeTruthy()
        })

        it('should make a request', () => {
            getInfo({})
            expect(httpRequest).toHaveBeenCalledWith('GET', `${url}/info`, {})
        })
    })

    describe('postS2SLease', () => {
        let postS2SLease

        beforeEach(() => {
            postS2SLease = route.postS2SLease
        })

        it('should expose function', () => {
            expect(postS2SLease).toBeTruthy()
        })

        // need to figure out how to fake otp
        xit('should make a request', () => {
            postS2SLease({})
            expect(httpRequest).toHaveBeenCalledWith('POST', `${url}/lease`, {})
        })
    })
})
