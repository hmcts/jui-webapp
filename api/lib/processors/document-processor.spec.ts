import * as chai from 'chai'
import 'mocha'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import * as documentProcessor from './document-processor'
chai.use(sinonChai)

describe('Document default', () => {
    it('should have  the default method ', () => {
        const documents = [{ id: '', document_url: 'about/us' }]
        const caseData = { documents: [] }
        const method = documentProcessor.default(documents, caseData)
        expect(method).to.exist
    })
    it('should return a array', () => {
        const documents = [{ id: '', document_url: 'about/us' }]
        const caseData = { documents: [] }
        const method = documentProcessor.default(documents, caseData)
        expect(method).to.be.an('array')
    })
})
