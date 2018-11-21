const proxyquire = require('proxyquire').noPreserveCache()
const supertest = require('supertest')
const express = require('express')
const config = require('../../../config')

const url = config.services.coh_cor_api

describe('coh-cor-api spec', () => {
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

        route = proxyquire('./coh-cor-api.js', {
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
})
