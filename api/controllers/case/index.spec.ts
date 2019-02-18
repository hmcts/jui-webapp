import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import * as getCaseTemplate from './templates/index'

import * as processCaseState from '../../lib/processors/case-state-model'
import * as valueProcessor from '../../lib/processors/value-processor'
import * as utils from '../../lib/util'
import * as ccdStore from '../../services/ccd-store-api/ccd-store'
import * as cohCorApi from '../../services/coh-cor-api/coh-cor-api'
import * as dmStore from '../../services/DMStore'
import * as events from '../events'

import * as questions from '../questions/index'
import * as index from './index'

describe('index', () => {
    describe('getCaseWithEventsAndQuestions', () => {
        let sandbox = null
        const stub = []
        const userId = 1
        const jurisdiction = 'SSCS'
        const caseType = 2
        const caseId = 3
        beforeEach(() => {
            sandbox = sinon.createSandbox()
            stub[0] = sandbox.stub(ccdStore, 'getCCDCase')
            stub[1] = sandbox.stub(events, 'getEvents')
            stub[2] = sandbox.stub(cohCorApi, 'getHearingByCase')
            stub[3] = sandbox.stub(questions, 'getAllQuestionsByCase')
            stub[4] = sandbox.stub(utils, 'judgeLookUp')
        })
        afterEach(() => {
            sandbox.restore()
        })
        it('should return an array', async () => {
            stub[0].resolves({case_data: {assignedToJudge: true, assignedToJudgeName: 'Judge Smith'}})
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves(4)
            stub[4].returns(5)
            const result = await index.getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
            expect(result).to.be.an('array')
            expect(result).to.eql([
                {
                    'case_data': {
                        'assignedToJudge': true,
                        'assignedToJudgeName': 5,
                    },
                },
                2,
                3,
                4,
            ])
        })
        it('should return an array when \'assignedToDisabilityMember\'', async () => {
            stub[0].resolves({case_data: {assignedToDisabilityMember: '1 | 2'}})
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves(4)
            stub[4].returns(5)
            const result = await index.getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
            expect(result).to.be.an('array')
            expect(result).to.eql([
                {
                    'case_data': {
                        'assignedToDisabilityMember': ' 2',
                    },
                },
                2,
                3,
                4,
            ])
        })
        it('should return an array when \'assignedToMedicalMember\'', async () => {
            stub[0].resolves({case_data: {assignedToMedicalMember: '1 | 2'}})
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves(4)
            stub[4].returns(5)
            const result = await index.getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
            expect(result).to.be.an('array')
            expect(result).to.eql([
                {
                    'case_data': {
                        'assignedToMedicalMember': ' 2',
                    },
                },
                2,
                3,
                4,
            ])
        })
    })
    describe('appendDocuments', () => {
        it('should return an object', async () => {
            const caseData = {}
            const schema = {}
            const stub = sinon.stub(dmStore, 'getDocuments')
            stub.resolves([{_links: {self: {href: 'asd/asd/asd'}}}])
            const result = await index.appendDocuments(caseData, schema)
            expect(result.caseData).to.be.an('object')
            expect(result.caseData.documents).to.be.an('array')
        })
    })
    describe('replaceSectionValues', () => {
        it('should call itself recursively and then \'valueProcessor\'', () => {
            const caseData = {}
            const section = {
                sections: [
                    {fields: [{value: 1}]},
                    {fields: [{value: 2}]},
                ],
            }
            const stub = sinon.stub(valueProcessor, 'dataLookup')
            stub.returns(1)
            index.replaceSectionValues(section, caseData)
            expect(stub).to.be.called
            stub.restore()
        })
        it('should call valueProcessor directly', () => {
            const caseData = {}
            const section = {
                fields: [{value: 1}],
            }
            const stub = sinon.stub(valueProcessor, 'dataLookup')
            stub.returns(1)
            index.replaceSectionValues(section, caseData)
            expect(stub).to.be.called
            stub.restore()
        })
    })
    describe('getCaseData', () => {
        it('should return object', async () => {
            const sandbox = sinon.createSandbox()
            const stub = []
            stub[0] = sandbox.stub(ccdStore, 'getCCDCase')
            stub[1] = sandbox.stub(events, 'getEvents')
            stub[2] = sandbox.stub(cohCorApi, 'getHearingByCase')
            stub[3] = sandbox.stub(questions, 'getAllQuestionsByCase')
            stub[4] = sandbox.stub(utils, 'judgeLookUp')
            stub[0].resolves({case_data: {assignedToMedicalMember: '1 | 2'}})
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves([1, 2, 3])
            stub[4].returns(5)
            const userId = 1
            const jurisdiction = 'SSCS'
            const caseType = 'SSCS'
            const caseId = 123
            const result = await index.getCaseData(userId, jurisdiction, caseType, caseId)
            expect(result).to.not.be.null
            expect(result).to.be.an('object')
            sandbox.restore()
        })
    })
    describe('getCaseTransformed', () => {
        it('should return', async () => {
            const sandbox = sinon.createSandbox()
            const stub = []
            stub[0] = sandbox.stub(ccdStore, 'getCCDCase')
            stub[1] = sandbox.stub(events, 'getEvents')
            stub[2] = sandbox.stub(cohCorApi, 'getHearingByCase')
            stub[3] = sandbox.stub(questions, 'getAllQuestionsByCase')
            stub[4] = sandbox.stub(utils, 'judgeLookUp')
            stub[5] = sandbox.stub(processCaseState, 'processCaseState')
            stub[6] = sandbox.stub(getCaseTemplate, 'default')
            stub[7] = sinon.stub(valueProcessor, 'dataLookup')
            stub[0].resolves({case_data: {assignedToMedicalMember: '1 | 2'}})
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves([1, 2, 3])
            stub[4].returns(5)
            stub[5].returns({})
            stub[6].returns({
                sections: [
                    {fields: [{value: 1}]},
                    {fields: [{value: 2}]},
                ],
            })
            stub[7].returns(1)
            const userId = 1
            const jurisdiction = 'SSCS'
            const caseType = 'SSCS'
            const caseId = 123
            const req = {}
            const result = await index.getCaseTransformed(userId, jurisdiction, caseType, caseId, req)
            expect(result).to.not.be.null
            expect(result).to.be.an('object')
            sandbox.restore()
        })
    })
})
