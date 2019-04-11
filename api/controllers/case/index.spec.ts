import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as responseRequest from '../../lib/middleware/responseRequest'
import * as getCaseTemplate from './templates/index'

import * as processCaseState from '../../lib/processors/case-state-model'
import * as valueProcessor from '../../lib/processors/value-processor'
import * as utils from '../../lib/util'
import * as ccdStore from '../../services/ccd-store-api/ccd-store'
import * as cohCorApi from '../../services/cohQA'
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

            const req = mockReq({
                cookies: [],
                session: {
                    user: {
                        email: true,
                        id: '1',
                    },
                },
            })
            const res = mockRes()
            responseRequest.default(req,
                res, () => { })
        })
        afterEach(() => {
            sandbox.restore()
        })
        it('should return an array', async () => {
            stub[0].resolves({ case_data: { assignedToJudge: true, assignedToJudgeName: 'Judge Smith' } })
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
        it('should return an array when assignedToDisabilityMember', async () => {
            stub[0].resolves({ case_data: { assignedToDisabilityMember: '1|2' } })
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves(4)
            stub[4].returns(5)
            const result = await index.getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
            expect(result).to.be.an('array')
            expect(result).to.eql([
                {
                    'case_data': {
                        'assignedToDisabilityMember': '2',
                    },
                },
                2,
                3,
                4,
            ])
        })
        it('should return an array when assignedToMedicalMember', async () => {
            stub[0].resolves({ case_data: { assignedToMedicalMember: '1|2' } })
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves(4)
            stub[4].returns(5)
            const result = await index.getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
            expect(result).to.be.an('array')
            expect(result).to.eql([
                {
                    'case_data': {
                        'assignedToMedicalMember': '2',
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
            stub.resolves([{ _links: { self: { href: 'asd/asd/asd' } } }])
            const result = await index.appendDocuments(caseData, schema)
            expect(result.caseData).to.be.an('object')
            expect(result.caseData.documents).to.be.an('array')
        })
    })
    describe('replaceSectionValues', () => {
        it('should call itself recursively and then valueProcessor', () => {
            const caseData = {}
            const section = {
                sections: [
                    { fields: [{ value: 1 }] },
                    { fields: [{ value: 2 }] },
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
                fields: [{ value: 1 }],
            }
            const stub = sinon.stub(valueProcessor, 'dataLookup')
            stub.returns(1)
            index.replaceSectionValues(section, caseData)
            expect(stub).to.be.called
            stub.restore()
        })
    })

    describe('appendCollectedData', () => {
        it('should return append collected data', () => {
            const caseData = {}
            const section = {
                sections: [
                    { fields: [{ value: 1 }] },
                    { fields: [{ value: 2 }] },
                ],
            }
            index.appendCollectedData([caseData, section, [], []])
            expect(caseData).to.be.an('object')
        })
    })

    describe('getDocIdList', () => {
        it('should return split document link', () => {
            const caseData = {}
            const section = {
                sections: [
                    { fields: [{ value: 1 }] },
                    { fields: [{ value: 2 }] },
                ],
            }
            const document = {
                document_url: 'some/path/to/heaven'
            }
            const dockId = index.getDocIdList([document])
            expect(dockId).to.be.an('array')
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
            stub[0].resolves({ case_data: { assignedToMedicalMember: '1|2' } })
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves([1, 2, 3])
            stub[4].returns(5)
            const userId = '1'
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
        it('should return object', async () => {
            const sandbox = sinon.createSandbox()
            const stub = []
            stub[0] = sandbox.stub(ccdStore, 'getCCDCase')
            stub[1] = sandbox.stub(events, 'getEvents')
            stub[2] = sandbox.stub(cohCorApi, 'getHearingByCase')
            stub[3] = sandbox.stub(questions, 'getAllQuestionsByCase')
            stub[4] = sandbox.stub(utils, 'judgeLookUp')
            stub[5] = sandbox.stub(processCaseState, 'processCaseState')
            stub[6] = sandbox.stub(getCaseTemplate, 'default')
            stub[7] = sandbox.stub(valueProcessor, 'dataLookup')
            stub[0].resolves({ case_data: { assignedToMedicalMember: '1|2' } })
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves([1, 2, 3])
            stub[4].returns(5)
            stub[5].returns({})
            stub[6].returns({
                sections: [
                    { fields: [{ value: 1 }] },
                    { fields: [{ value: 2 }] },
                ],
            })
            stub[7].returns(1)
            const userId = '1'
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
    describe('getCaseRaw', () => {
        it('should return an object with 5 properties', async () => {
            const sandbox = sinon.createSandbox()
            const stub = []
            stub[0] = sandbox.stub(ccdStore, 'getCCDCase')
            stub[1] = sandbox.stub(events, 'getEvents')
            stub[2] = sandbox.stub(cohCorApi, 'getHearingByCase')
            stub[3] = sandbox.stub(questions, 'getAllQuestionsByCase')
            stub[4] = sandbox.stub(utils, 'judgeLookUp')
            stub[5] = sandbox.stub(processCaseState, 'processCaseState')
            stub[6] = sandbox.stub(getCaseTemplate, 'default')
            stub[7] = sandbox.stub(valueProcessor, 'dataLookup')
            stub[0].resolves({ case_data: { assignedToMedicalMember: '1|2' } })
            stub[1].resolves(2)
            stub[2].resolves(3)
            stub[3].resolves([1, 2, 3])
            stub[4].returns(5)
            stub[5].returns({})
            stub[6].returns({
                sections: [
                    { fields: [{ value: 1 }] },
                    { fields: [{ value: 2 }] },
                ],
            })
            stub[7].returns(1)
            const userId = '1'
            const jurisdiction = 'SSCS'
            const caseType = 'SSCS'
            const caseId = 123
            const req = {}
            const result = await index.getCaseRaw(userId, jurisdiction, caseType, caseId, req)
            expect(result).to.not.be.null
            expect(result).to.be.an('object')
            expect(Object.keys(result).length).to.equal(5)
            sandbox.restore()
        })
    })

    describe('checkValidUser', () => {

        beforeEach(() => {
            const req = mockReq({
                cookies: [],
                session: {
                    user: {
                        email: true,
                        id: '1',
                    },
                },
            })
            const res = mockRes()
            responseRequest.default(req, res, () => { })
        })

        it('should return true for a valid user', async () => {
            expect(index.checkValidUser({ assignedToMedicalMember: '1| test' })).to.equal(true)
        })

        it('should return false for an invalid user', async () => {
            expect(index.checkValidUser({ assignedToMedicalMember: '2| test' })).to.equal(false)
        })
    })
})
