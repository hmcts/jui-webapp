import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)

import {http} from '../lib/http'
import * as DMStore from './DMStore'

import {config} from '../../config'

describe('DMStore', () => {
    const res = {
        data: 'okay',
    }

    const url = config.services.dm_store_api

    let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPatch: any

    beforeEach(() => {

        spy = sinon.stub(http, 'get').resolves(res)
        spyPost = sinon.stub(http, 'post').resolves(res)
        spyPatch = sinon.stub(http, 'patch').resolves(res)
        spyDelete = sinon.stub(http, 'delete').resolves(res)
    })

    afterEach(() => {

        spy.restore()
        spyPost.restore()
        spyPatch.restore()
        spyDelete.restore()
    })

    describe('getDocument()', () => {

        const documentId = 'document Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocument(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await DMStore.getDocument(documentId)).to.equal('okay')
        })

    })

    describe('getDocumentVersion()', () => {

        const documentId = 'Document Id'
        const versionId = 'Version Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocumentVersion(documentId, versionId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/versions/${versionId}`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentVersion(documentId, versionId)).to.equal('okay')
        })
    })

    describe('getDocumentBinary()', () => {

        const documentId = 'Document Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocumentBinary(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/binary`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentBinary(documentId)).to.equal('okay')
        })
    })

    describe('getDocumentVersionBinary()', () => {

        const documentId = 'Document Id'
        const versionId = 'Version Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocumentVersionBinary(documentId, versionId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/versions/${versionId}/binary`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentVersionBinary(documentId, versionId)).to.equal('okay')
        })
    })

    describe('getDocumentThumbnail()', () => {

        const documentId = 'Document Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocumentThumbnail(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/thumbnail`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentThumbnail(documentId)).to.equal('okay')
        })
    })

    describe('getDocumentVersionThumbnail()', () => {

        const documentId = 'Document Id'
        const versionId = 'Version Id'

        it('Should make a http.get call based on the document Id and version Id', async () => {

            await DMStore.getDocumentVersionThumbnail(documentId, versionId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/versions/${versionId}/thumbnail`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentVersionThumbnail(documentId, versionId)).to.equal('okay')
        })
    })

    describe('postDocumentVersion()', () => {

        const documentId = 'Document Id'
        const file = ''
        const body = 'body'

        it('Should make a http.post call based on the document Id and version Id', async () => {

            await DMStore.postDocumentVersion(documentId, file, body)
            expect(spyPost).to.be.calledWith(`${url}/documents/${documentId}`)
        })

        it('Should return the data property of the return of the http.post call', async () => {

            expect(await DMStore.postDocumentVersion(documentId, file, body)).to.equal('okay')
        })
    })

    describe('postDocumentVersionVersion()', () => {

        const documentId = 'Document Id'
        const file = ''
        const body = 'body'

        it('Should make a http.post call based on the document Id and version Id', async () => {

            await DMStore.postDocumentVersionVersion(documentId, file, body)
            expect(spyPost).to.be.calledWith(`${url}/documents/${documentId}`)
        })

        it('Should return the data property of the return of the http.post call', async () => {

            expect(await DMStore.postDocumentVersionVersion(documentId, file, body)).to.equal('okay')
        })
    })

    describe('patchDocument()', () => {

        const documentId = 'Document Id'
        const updateDocumentCommand = 'test'
        const body = {
            body: 'testBody',
        }

        it('Should make a http.patch call', async () => {

            await DMStore.patchDocument(documentId, updateDocumentCommand, body)
            expect(spyPatch).to.be.calledWith(`${url}/documents/${documentId}`, { ...body, updateDocumentCommand})
        })

        it('Should return the data property of the return of the http.patch call', async () => {

            expect(await DMStore.patchDocument(documentId, updateDocumentCommand, body)).to.equal('okay')
        })
    })

    describe('deleteDocument()', () => {

        const documentId = 'Document Id'

        it('Should make a http.delete call based on the document Id', async () => {

            await DMStore.deleteDocument(documentId)
            expect(spyDelete).to.be.calledWith(`${url}/documents/${documentId}`)
        })

        it('Should return the data property of the return of the http.post call', async () => {

            expect(await DMStore.deleteDocument(documentId)).to.equal('okay')
        })
    })

    describe('getDocumentAuditEntries()', () => {

        const documentId = 'Document Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocumentAuditEntries(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/auditEntries`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentAuditEntries(documentId)).to.equal('okay')
        })
    })

    describe('filterDocument()', () => {

        const body = 'body'

        it('Should make a http.post call based on the body', async () => {

            await DMStore.filterDocument(body)
            expect(spyPost).to.be.calledWith(`${url}/documents/filter`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.filterDocument(body)).to.equal('okay')
        })
    })

    const testQueryStringParams = params => {
        return Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&')
    }

    describe('ownedDocument()', () => {

        const params = {
            one: 'one',
            two: 'two',
        }

        const body = 'body'

        it('Should make a http.post call based on the body', async () => {

            await DMStore.ownedDocument(params, body)
            expect(spyPost).to.be.calledWith(`${url}/documents/owned?${testQueryStringParams(params)}`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.ownedDocument(params, body)).to.equal('okay')
        })
    })

    describe('postDocumentVersionMigrate()', () => {

        const documentId = 'Document Id'
        const versionId = 'Version Id'
        const body = 'body'

        it('Should make a http.post call based on the body', async () => {

            await DMStore.postDocumentVersionMigrate(documentId, versionId, body)
            expect(spyPost).to.be.calledWith(`${url}/documents/${documentId}/versions/${versionId}/migrate`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.postDocumentVersionMigrate(documentId, versionId, body)).to.equal('okay')
        })
    })
})
