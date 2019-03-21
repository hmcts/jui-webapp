import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import { http } from '../lib/http'
import * as DMStore from './DMStore'

import { config } from '../../config'

describe('DMStore', () => {
    const res = {
        data: 'okay',
    }

    const url = config.services.dm_store_api

    // let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPut: any

    beforeEach(() => {
        spyDelete = sinon.stub(http, 'delete').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPost = sinon.stub(http, 'post').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPut = sinon.stub(http, 'put').callsFake(() => {
            return Promise.resolve(res)
        })
    })

    afterEach(() => {
        // spy.restore()
        spyPost.restore()
        spyPut.restore()
        spyDelete.restore()
    })

    describe('getDocument()', () => {

        const documentId = 'document Id'

        it('Should make a http.get call based on the document Id', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            await DMStore.getDocument(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}`)

            spy.restore()
        })

        it('Should return the data property of the return of a http.get call', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            expect(await DMStore.getDocument(documentId)).to.equal('okay')

            spy.restore()
        })

        /**
         * Error Condition if asyncReturnOrError returns a null.
         */
        it('should return null if asyncReturnOrError returns null', async () => {

            const spy = sinon.stub(http, 'get').resolves(null)

            expect(await DMStore.getDocument(documentId)).to.equal(null)

            spy.restore()
        })
    })

    // TODO: Get this working
    xdescribe('getDocuments()', () => {

        const documentIds = ['42', '42']

        it('Should make a call to getDocument() for each document Id', async () => {

            const spy = sinon.stub(DMStore, 'getDocument').resolves(res)

            await DMStore.getDocuments(documentIds)

            expect(spy).to.be.called

            spy.restore()
        })
    })

    describe('getDocumentVersion()', () => {

        const documentId = 'Document Id'
        const versionId = 'Version Id'

        it('Should make a http.get call based on the document Id', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            await DMStore.getDocumentVersion(documentId, versionId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/versions/${versionId}`)

            spy.restore()
        })

        it('Should return the data property of the return of the http.get call', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            expect(await DMStore.getDocumentVersion(documentId, versionId)).to.equal('okay')

            spy.restore()
        })

        /**
         * Error Condition if asyncReturnOrError returns a null.
         */
        it('should return null if asyncReturnOrError returns null', async () => {

            const spy = sinon.stub(http, 'get').resolves(null)

            expect(await DMStore.getDocumentVersion(documentId, versionId)).to.equal(null)

            spy.restore()
        })
    })

    describe('getDocumentBinary()', () => {

        const documentId = 'Document Id'

        it('Should make a http.get call based on the document Id', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            await DMStore.getDocumentBinary(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/binary`)

            spy.restore()
        })

        it('Should return the data property of the return of the http.get call', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            expect(await DMStore.getDocumentBinary(documentId)).to.equal('okay')

            spy.restore()
        })
    })

    describe('getDocumentVersionBinary()', () => {

        const documentId = 'Document Id'
        const versionId = 'Version Id'

        it('Should make a http.get call based on the document Id', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            await DMStore.getDocumentVersionBinary(documentId, versionId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/versions/${versionId}/binary`)

            spy.restore()
        })

        it('Should return the data property of the return of the http.get call', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            expect(await DMStore.getDocumentVersionBinary(documentId, versionId)).to.equal('okay')

            spy.restore()
        })
    })

    describe('getDocumentThumbnail()', () => {

        const documentId = 'Document Id'

        it('Should make a http.get call based on the document Id', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            await DMStore.getDocumentThumbnail(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/thumbnail`)

            spy.restore()
        })

        it('Should return the data property of the return of the http.get call', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            expect(await DMStore.getDocumentThumbnail(documentId)).to.equal('okay')

            spy.restore()
        })
    })

    describe('getDocumentVersionThumbnail()', () => {

        const documentId = 'Document Id'
        const versionId = 'Version Id'

        it('Should make a http.get call based on the document Id and version Id', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            await DMStore.getDocumentVersionThumbnail(documentId, versionId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/versions/${versionId}/thumbnail`)

            spy.restore()
        })

        it('Should return the data property of the return of the http.get call', async () => {

            const spy = sinon.stub(http, 'get').resolves(res)

            expect(await DMStore.getDocumentVersionThumbnail(documentId, versionId)).to.equal('okay')

            spy.restore()
        })
    })
})
