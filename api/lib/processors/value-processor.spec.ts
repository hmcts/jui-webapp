
import * as chai from 'chai'
import 'mocha'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import * as valueProcessor from './value-processor'
import * as sinon from 'sinon'
import * as  caseStatusProcessor from './case-status-processor'
chai.use(sinonChai)

describe('dataLookup', () => {
    it('', () => {
        const sandbox = sinon.createSandbox()

        // const documents = [{ id: '', document_url: 'about/us' }]
        // const caseData = { documents: [] }
        const lookup = 'ABC'
        const caseData = 'testing'
        // sandbox.stub(caseStatusProcessor, 'createState').returns({ name: 'something', actionGoTo: 'yes', ID: '1' })

        // const method = valueProcessor.dataLookup(lookup, caseData)
        // expect(method).to.be.deep.equal(object)
        // expect(method).to.be.deep.equal(typeof Object)
        sandbox.restore()
    })
})
