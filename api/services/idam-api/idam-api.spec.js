const proxyquire = require('proxyquire').noPreserveCache()
const supertest = require('supertest')
const express = require('express')
const config = require('../../../config')

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
        httpRequest = jasmine.createSpy()
        httpRequest.and.callFake((url, options) => new Promise(httpResponse))

        app = express()

        route = proxyquire('./idam-api.js', {
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

    describe('getDetails', () => {
        let getDetails

        beforeEach(() => {
            getDetails = route.getDetails
        })

        it('should expose function', () => {
            expect(getDetails).toBeTruthy()
        })

        it('should make a request', () => {
            getDetails({})
            expect(httpRequest).toHaveBeenCalledWith('GET', `${url}/details`, {})
        })
    })

    describe('postOauthToken', () => {
        let postOauthToken

        beforeEach(() => {
            postOauthToken = route.postOauthToken
        })

        it('should expose function', () => {
            expect(postOauthToken).toBeTruthy()
        })

        // need to figure out how to fake otp
        xit('should make a request', () => {
            const code = 'abc12345'
            const host = 'fakehost'
            postOauthToken(code, host)
            expect(httpRequest).toHaveBeenCalledWith(
                'POST',
                `${url}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=http://${host}/oauth2/callback`,
                {
                    Authorization: 'Basic anVpd2ViYXBwOkFBQUFBQUFBQUFBQUFBQUE=',
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
        })
    })
})
