const proxyquire = require('proxyquire').noPreserveCache()
const supertest = require('supertest')
const express = require('express')
const config = require('../../../config')

const url = config.services.dm_store_api

describe('dm-store-api spec', () => {
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

        route = proxyquire('./dm-store-api.js', {
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
            expect(httpRequest).toHaveBeenCalledWith('GET', `${config.services.dm_store_api}/health`, {})
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
            expect(httpRequest).toHaveBeenCalledWith('GET', `${config.services.dm_store_api}/info`, {})
        })
    })

    describe('getDocumentBinary', () => {
        let getDocumentBinary

        beforeEach(() => {
            getDocumentBinary = route.getDocumentBinary
        })

        it('should expose getDocumentBinary function', () => {
            expect(getDocumentBinary).toBeTruthy()
        })

        it('should make a request', () => {
            getDocumentBinary('1234', {})
            expect(httpRequest).toHaveBeenCalledWith('GET', `${config.services.dm_store_api}/documents/1234/binary`, {})
        })
    })

    describe('getDocumentThumbnail', () => {
        let getDocumentThumbnail

        beforeEach(() => {
            getDocumentThumbnail = route.getDocumentThumbnail
        })

        it('should expose getDocumentBinary function', () => {
            expect(getDocumentThumbnail).toBeTruthy()
        })

        it('should make a request', () => {
            getDocumentThumbnail('1234', {})
            expect(httpRequest).toHaveBeenCalledWith('GET', `${config.services.dm_store_api}/documents/1234/thumbnail`, {})
        })
    })

    describe('getDocuments', () => {
        let getDocuments

        beforeEach(() => {
            getDocuments = route.getDocuments
        })

        it('should expose getDocuments function', () => {
            expect(getDocuments).toBeTruthy()
        })

        it('should return a promise of all outstanding requests', () => {
            expect(getDocuments().then).toBeTruthy()
        })

        it('should return all documents requested', done => {
            const docIds = ['1234', '5678']
            httpResponse = (resolve, reject) => {
                resolve({ docId: '1234' })
            }

            getDocuments(docIds, {}).then(documents => {
                expect(documents).toEqual([{ docId: '1234' }, { docId: '1234' }])
                done()
            })
        })
    })
})
