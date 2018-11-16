const proxyquire = require('proxyquire').noPreserveCache()
const supertest = require('supertest')
const express = require('express')
const config = require('../../../config')

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
        httpRequest = jasmine.createSpy()
        httpRequest.and.callFake((url, options) => new Promise(httpResponse))

        app = express()

        route = proxyquire('./ccd-def-api.js', {
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

    describe('getJurisdictions', () => {
        let getJurisdictions

        beforeEach(() => {
            getJurisdictions = route.getJurisdictions
        })

        it('should expose function', () => {
            expect(getJurisdictions).toBeTruthy()
        })

        it('should make a request', () => {
            getJurisdictions({})
            expect(httpRequest).toHaveBeenCalledWith('GET', `${url}/api/data/jurisdictions`, {})
        })
    })

    describe('getCaseTypes', () => {
        let getCaseTypes

        beforeEach(() => {
            getCaseTypes = route.getCaseTypes
        })

        it('should expose function', () => {
            expect(getCaseTypes).toBeTruthy()
        })

        it('should make a request', () => {
            const jurisdictions = 'jud'
            getCaseTypes(`${jurisdictions}`, {})
            expect(httpRequest).toHaveBeenCalledWith('GET', `${url}/api/data/jurisdictions/${jurisdictions}/case-type`, {})
        })
    })
})
