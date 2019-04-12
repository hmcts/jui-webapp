
import * as chai from 'chai'
import 'mocha'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import * as documentProcessor from './document-processor'
import * as sinon from 'sinon'

chai.use(sinonChai)

describe('Document default', () => {
    it.only('should return a document', () => {
        const documents = [{ id: '', document_url: '/help' }]
        const caseData = { documents: [] }
        documentProcessor.default(documents, caseData)

        // const sandbox = sinon.createSandbox()
        // const map = {something: 'bravo'}
        // const status = { stateName: 'something', actionGoTo: 'yes', ID: '1' }
        // const expected = { name: 'bravo', actionGoTo: 'yes', ID: '1' }
        // const result = caseStatusProcessor.createState(map, status)
        // expect(result.name).to.equal('bravo')
        // expect(result.actionGoTo).to.equal('yes')
        // expect(result.ID).to.equal('1')
        // expect(caseStatusProcessor.createState(map, status)).to.be.deep.equal(expected)
        // sandbox.restore()
    })
})
