
import * as chai from 'chai'
import 'mocha'
import { expect } from 'chai'
import * as sinonChai from 'sinon-chai'
import * as caseStatusProcessor from './case-status-processor'
import * as sinon from 'sinon'

chai.use(sinonChai)

describe('createState', () => {
    it('should createState return with a proper name', () => {
        const sandbox = sinon.createSandbox()
        const map = {something: 'bravo'}
        const status = { stateName: 'something', actionGoTo: 'yes', ID: '1' }
        const expected = { name: 'bravo', actionGoTo: 'yes', ID: '1' }
        const result = caseStatusProcessor.createState(map, status)
        expect(result.name).to.equal('bravo')
        expect(result.actionGoTo).to.equal('yes')
        expect(result.ID).to.equal('1')
        expect(caseStatusProcessor.createState(map, status)).to.be.deep.equal(expected)
        sandbox.restore()
    })
    it('should createState return with a status.stateName', () => {
        const sandbox = sinon.createSandbox()
        const map = {}
        const status = { stateName: 'something', actionGoTo: 'yes', ID: '1' }
        const expected = { name: 'something', actionGoTo: 'yes', ID: '1' }
        const result = caseStatusProcessor.createState(map, status)
        expect(result.name).to.equal('something')
        expect(result.actionGoTo).to.equal('yes')
        expect(result.ID).to.equal('1')
        expect(result).to.be.deep.equal(expected)
        sandbox.restore()
    })
})
describe('caseStatusProcessor', () => {
    it('should caseStatusProcessor return undefined', () => {
        const sandbox = sinon.createSandbox()
        const caseData = {jurisdiction: 'something', case_type_id: 'bravo'}
        const status = true
        sandbox.stub(caseStatusProcessor, 'createState').returns({ name: 'something', actionGoTo: 'yes', ID: '1' })
        const expected = { name: 'something', actionGoTo: 'yes', ID: '1' }
        const result = caseStatusProcessor.caseStatusProcessor(status, caseData)
        expect(result).to.be.deep.equal({ name: undefined, actionGoTo: undefined, ID: undefined })
        sandbox.restore()
    })
    it('should caseStatusProcessor return undefined', () => {
        const sandbox = sinon.createSandbox()
        const caseData = {jurisdiction: 'something', case_type_id: 'bravo'}
        const status = false
        sandbox.stub(caseStatusProcessor, 'createState').returns({ name: 'something', actionGoTo: 'yes', ID: '1' })
        const expected = { name: 'something', actionGoTo: 'yes', ID: '1' }
        const result = caseStatusProcessor.caseStatusProcessor(status, caseData)
        expect(result).to.be.false
        sandbox.restore()
    })
})
