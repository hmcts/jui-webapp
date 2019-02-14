import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import * as assignCase from './assignCase'
import * as ccdStore from '../../services/ccd-store-api/ccd-store'
import * as cohCorApi from '../../services/cohQA'
import * as filters from '../../lib/filters'
import * as getAllQuestionsByCase from '../questions/index'
import * as idamApi from '../../services/idam'
import * as utils from '../../lib/util'
import {
    aggregatedData,
    appendCOR,
    appendQuestionsRound,
    assign,
    combineLists,
    getCases,
    getCOR,
    getHearingWithQuestionData,
    getMutiJudCaseAssignedCases,
    getMutiJudCaseRaw,
    getMutiJudCaseRawCoh,
    getQuestionData,
    raw,
    rawCOH,
    sortCases,
    sortTransformedCases,
    unassign,
    unassignAll
} from './index'

describe('index', () => {
    describe('getMutiJudCaseRaw', () => {
        it('Should return caseLists array', async () => {
            const userDetails = { id: 1, name: 'John Doe', roles: [1, 2, 3] }
            const stub = sinon.stub(ccdStore, 'getMutiJudCCDCases')
            stub.returns([1, 2, 3])
            const result = await getMutiJudCaseRaw(userDetails)
            expect(stub).to.be.called
            expect(result).to.be.an('array')
            stub.restore()
        })
    })
    describe('combineLists', () => {
        it('Should return concatenated array', () => {
            const lists = [[1, 2], [3, 4]]
            const result = combineLists(lists)
            expect(result).to.be.an('array')
            expect(result).to.eql([1, 2, 3, 4])
        })
    })
    describe('sortTransformedCases', () => {
        it('Should return array of cases sorted by lastModified', () => {
            const results = [
                { id: 1, case_fields: { lastModified: 1549899256 } },
                { id: 2, case_fields: { lastModified: 1549899156 } },
                { id: 3, case_fields: { lastModified: 1549899216 } },
            ]
            const result = sortTransformedCases(results)
            expect(result).to.be.an('array')
            expect(result[0].id).to.equal(2)
            expect(result[1].id).to.equal(3)
            expect(result[2].id).to.equal(1)
        })
    })
    describe('sortCases', () => {
        it('Should return array of cases sorted by last_modified', () => {
            const results = [
                { id: 1, last_modified: 1549899256 },
                { id: 2, last_modified: 1549899156 },
                { id: 3, last_modified: 1549899216 },
            ]
            const result = sortCases(results)
            expect(result).to.be.an('array')
            expect(result[0].id).to.equal(2)
            expect(result[1].id).to.equal(3)
            expect(result[2].id).to.equal(1)
        })
    })
    describe('aggregatedData', () => {
        it('Should return object', () => {
            const results = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]
            const result = aggregatedData(results)
            expect(result).to.be.an('object')
            expect(result.columns).to.not.be.null
            expect(result.results).to.equal(results)
        })
    })
    describe('appendCOR', () => {
        it('Should return array when provided \'caseLists\'', async () => {
            const caseLists = [
                { id: 1 }, { id: 2 },
            ]
            const stubReturns = {
                online_hearings: [
                    {
                        case_id: 1,
                    }, {
                        case_id: 2,
                    },
                ],
            }
            const stub = sinon.stub(cohCorApi, 'getHearingByCase')
            stub.returns(stubReturns)
            const result = await appendCOR(caseLists)
            expect(result).to.be.an('array')
            expect(result[0]).to.be.an('array')
            stub.restore()
        })
    })
    describe('getCOR', () => {
        // @todo - contains unused parameter
        it('Should call getHearingByCase', async () => {
            const casesData = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]
            const options = {}
            const stub = sinon.stub(cohCorApi, 'getHearingByCase')
            stub.returns(123)
            const result = await getCOR(casesData, options)
            expect(stub).to.be.calledWith('case_id=1&case_id=2&case_id=3')
            stub.restore()
        })
        it('Should return casesData', async () => {
            const casesData = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]
            const stubReturns = {
                online_hearings: [
                    {
                        case_id: 1,
                    }, {
                        case_id: 2,
                    },
                ],
            }
            const options = {}
            const stub = sinon.stub(cohCorApi, 'getHearingByCase')
            stub.returns(stubReturns)
            const result = await getCOR(casesData, options)
            expect(result).to.be.an('array')
            expect(result[0]).to.eql({
                'id': 1,
                'hearing_data': {
                    'case_id': 1
                }
            })
            stub.restore()
        })
    })
    describe('getHearingWithQuestionData', () => {
        it('Should return object', async () => {
            const caseData = {
                id: 1,
            }
            const expectedResult = {
                id: 1,
                questions: 2,
            }
            const userId = 2
            const stub = sinon.stub(getAllQuestionsByCase, 'getAllQuestionsByCase')
            stub.returns({ questions: 2 })
            const result = await getHearingWithQuestionData(caseData, userId)
            expect(result).to.be.an('object')
            expect(result).to.eql(expectedResult)
            stub.restore()
        })
    })
    describe('getQuestionData', () => {
        it('Should return filtered mapped property if no \'hearing_data\'', async () => {
            const caseLists = [{
                id: 1,
            }]
            const userId = 2
            const result = await getQuestionData(caseLists, userId)
            expect(result).to.be.an('array')
        })
        it('Should return \'getHearingWithQuestionData\' if \'hearing_data\'', async () => {
            const caseLists = [{
                hearing_data: true,
                id: 1,
            }]
            const expectedResult = [{ id: 1, questions: 2 }]
            const userId = 2
            const stub = sinon.stub(getAllQuestionsByCase, 'getAllQuestionsByCase').resolves({ questions: 2 })
            await getQuestionData(caseLists, userId).then(result => {
                expect(result).to.be.an('array')
                expect(result).to.eql(expectedResult)
            })
            stub.restore()
        })
    })
    describe('getMutiJudCaseAssignedCases', () => {
        it('Should return getMutiJudCCDCases', async () => {
            const userDetails = { id: 1, roles: [1, 2, 3] }
            const stub = sinon.stub(ccdStore, 'getMutiJudCCDCases')
            stub.resolves(123)
            const result = await getMutiJudCaseAssignedCases(userDetails)
            expect(stub).to.be.called
            expect(result).to.equal(123)
            stub.restore()
        })
    })
    describe('getCases', () => {
        it('Should call getUser', async () => {
            const res = {
                send: () => false,
                setHeader: () => false,
                status: function () {
                    return this
                },
            }
            const stub = sinon.stub(idamApi, 'getUser')
            const stub2 = sinon.stub(filters, 'filterByCaseTypeAndRole')
            const stub3 = sinon.stub(utils, 'asyncReturnOrError')
            stub.resolves({ id: 1, roles: [1, 2, 3] })
            stub2.resolves([1, 2, 3])
            stub3.resolves([1, 2, 3])
            const result = await getCases(res)
            expect(stub).to.be.called
            // expect(result).to.be.an('array')
            stub.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('unassign', () => {
        it('Should call getUser', async () => {
            const res = {
                send: () => false,
                setHeader: () => false,
                status: function () {
                    return this
                },
            }
            const stub = sinon.stub(idamApi, 'getUser')
            const stub2 = sinon.stub(filters, 'filterByCaseTypeAndRole')
            const stub3 = sinon.stub(utils, 'asyncReturnOrError')
            stub.resolves({ id: 1, roles: [1, 2, 3] })
            stub2.resolves([1, 2, 3])
            stub3.resolves([1, 2, 3])
            const result = await unassign(res)
            expect(stub).to.be.called
            // expect(result).to.be.an('array')
            stub.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('assign', () => {
        it('Should call getUser', async () => {
            const req = {
                auth: {
                    id: 1,
                },
            }
            const res = {
                send: () => false,
                setHeader: () => false,
                status: function () {
                    return this
                },
            }
            const stub = sinon.stub(assignCase, 'getNewCase')
            const stub2 = sinon.stub(filters, 'filterByCaseTypeAndRole')
            const stub3 = sinon.stub(utils, 'asyncReturnOrError')
            stub.returns({ id: 1, roles: [1, 2, 3] })
            stub2.resolves([1, 2, 3])
            stub3.resolves([1, 2, 3])
            const result = await assign(req, res)
            expect(stub).to.be.called
            // expect(result).to.be.an('array')
            stub.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('raw', () => {
        it('Should call getUser', async () => {
            const res = {
                send: () => false,
                setHeader: () => false,
                status: function () {
                    return this
                },
            }
            const stub = sinon.stub(idamApi, 'getUser')
            const stub2 = sinon.stub(filters, 'filterByCaseTypeAndRole')
            const stub3 = sinon.stub(utils, 'asyncReturnOrError')
            stub.returns({ id: 1, roles: [1, 2, 3] })
            stub2.resolves([1, 2, 3])
            stub3.resolves([1, 2, 3])
            const result = await raw(res)
            expect(stub).to.be.called
            // expect(result).to.be.an('array')
            stub.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('rawCOH', () => {
        it('Should call getUser', async () => {
            // the non arrow-function below is required by Sinon
            const res = {
                send: () => false,
                setHeader: () => false,
                status: function () {
                    return this
                },
            }
            const stub = sinon.stub(idamApi, 'getUser')
            const stub2 = sinon.stub(filters, 'filterByCaseTypeAndRole')
            const stub3 = sinon.stub(utils, 'asyncReturnOrError')
            stub.returns({ id: 1, roles: [1, 2, 3] })
            stub2.resolves([1, 2, 3])
            stub3.resolves([
                { id: 1, last_modified: 1549899256 },
                { id: 2, last_modified: 1549899156 },
                { id: 3, last_modified: 1549899216 },
            ])
            const result = await rawCOH(res)
            expect(stub).to.be.called
            // expect(result).to.be.an('array')
            stub.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('unassignAll', () => {
        it('Should call \'unassignAllCaseFromJudge\'', async () => {
            const req = {
                auth: {
                    id: 1,
                },
            }
            const res = {}
            const caseLists = []
            const stub = sinon.stub(assignCase, 'unassignAllCaseFromJudge')
            const stub2 = sinon.stub(ccdStore, 'getMutiJudCCDCases')
            const stub3 = sinon.stub(filters, 'filterByCaseTypeAndRole')
            stub.returns(1)
            stub2.resolves({ id: 2 })
            stub3.resolves(3)
            const result = await unassignAll(req, res)
            expect(stub).to.be.called
            expect(result).to.equal(1)
            stub.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('appendQuestionsRound', () => {
        it('Should return empty array if poorly formed \'caseLists\' provided', async () => {
            const caseLists = [{ id: 1 }, { id: 2 }]
            const userId = 1
            const stub = sinon.stub(getAllQuestionsByCase, 'getAllQuestionsByCase')
            stub.resolves(123)
            const result = await appendQuestionsRound(caseLists, userId)
            expect(stub).to.not.be.called
            expect(result).to.eql([[], []])
            stub.restore()
        })
        it('Should return data if correctly formed \'caseLists\' provided', async () => {
            const caseLists = [
                [{ id: 1, question_data: 1 }, { id: 2, question_data: 2 }],
                [{ id: 3, question_data: 3 }, { id: 4, question_data: 4 }]]
            const userId = 1
            const result = await appendQuestionsRound(caseLists, userId)
            expect(result).to.be.an('array')
            expect(result[1]).to.not.be.null
        })
    })
})
