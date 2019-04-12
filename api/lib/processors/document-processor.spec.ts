
import * as chai from 'chai'
import 'mocha'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import * as documentProcessor from './document-processor'
import * as sinon from 'sinon'

chai.use(sinonChai)

describe('Document default', () => {
    it('should return a document', () => {
        const documents = [{ id: '', document_url: 'about/us' }]
        const caseData = { documents: [] }
        const method = documentProcessor.default(documents, caseData)
        expect(method).to.exist
        expect(method).to.be.an('array')
    })
})
