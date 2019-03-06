import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import * as util from '../../lib/util'
import * as headerUtilities from '../../lib/utilities/headerUtilities'
import * as cohCor from '../../services/cohQA'
import * as index from './index'
import { getOrdinalNumber, getRoundAndAnswer } from './index'
import { getRoundAndHalfAnswer } from './index'

describe('index', () => {
    describe('formatQuestion', () => {
        it('should return an object', () => {
            const body = {
                question: 1,
                rounds: 3,
                subject: 2,
            }
            const email = 'a@a.com'
            const result = index.formatQuestion(body, email)
            expect(result).to.be.an('object')
            expect(result.question_header_text).to.eql(2)
        })
    })
    describe('formatQuestions', () => {
        it('should return an array', () => {
            const questions = [
                {
                    current_question_state: {
                        state_datetime: 6,
                        state_name: 5,
                    },
                    owner_reference: 0,
                    question_body_text: 4,
                    question_header_text: 3,
                    question_id: 1,
                    question_round: 2,
                },
                {
                    current_question_state: {
                        state_datetime: 6,
                        state_name: 5,
                    },
                    owner_reference: 0,
                    question_body_text: 4,
                    question_header_text: 3,
                    question_id: 2,
                    question_round: 2,
                },
            ]
            const stub = sinon.stub(util, 'judgeLookUp')
            stub.returns(1)
            const result = index.formatQuestions(questions)
            expect(result).to.be.an('array')
            expect(result[0].id).to.eql(1)
            expect(result[1].id).to.eql(2)
            stub.restore()
        })
    })
    describe('formatQuestionRes', () => {
        it('should return an object', () => {
            const question = {
                current_question_state: {
                    state_datetime: 6,
                    state_name: 5,
                },
                owner_reference: 0,
                question_body_text: 4,
                question_header_text: 3,
                question_id: 1,
                question_round: 2,
            }
            const answers = [1, 2, 3]
            const stub = sinon.stub(util, 'judgeLookUp')
            stub.returns(1)
            const result = index.formatQuestionRes(question, answers)
            expect(result).to.be.an('object')
            expect(result.id).to.eql(1)
            stub.restore()
        })
    })
    describe('formatAnswer', () => {
        it('should return an object if body not null', () => {
            const body = {
                state: 1,
                text: 2,
            }
            const result = index.formatAnswer(body)
            expect(result).to.be.an('object')
            expect(result.answer_state).to.eql(1)
        })
        it('should return an object if body is null', () => {
            const result = index.formatAnswer()
            expect(result).to.be.an('object')
            expect(result.answer_state).to.eql('answer_submitted')
        })
    })
    describe('getExpirationDate', () => {
        it('should return the expiration date', () => {
            const questions = [
                {
                    deadline_expiry_date: 1550586891,
                    id: 1,
                },
                {
                    deadline_expiry_date: 1550596891,
                    id: 2,
                },
            ]
            const result = index.getExpirationDate(questions)
            expect(result).to.eql(1550596891)
        })
    })
    describe('countStates', () => {
        it('should return the count of states that match provided state', () => {
            const questions = [
                {
                    current_question_state: {
                        state_name: 2,
                    },
                    id: 1,
                },
                {
                    current_question_state: {
                        state_name: 2,
                    },
                    id: 2,
                },
            ]
            const state = 2
            const result = index.countStates(questions, state)
            expect(result).to.eql(2)
        })
    })
    describe('formatRounds', () => {
        it('should return an array', () => {
            const rounds = [
                {
                    deadline_expiry_date: 1550586891,
                    deadline_extension_count: 0,
                    id: 1,
                    question_references: [
                        {
                            current_question_state: {
                                state_name: 'question_answered',
                            },
                            deadline_expiry_date: 1550586891,
                            deadline_extension_count: 0,
                            id: 1,
                            question_round_number: 2,
                            question_round_state: 1,
                        },
                        {
                            current_question_state: {
                                state_name: 'question_answered',
                            },
                            deadline_expiry_date: 1550596891,
                            deadline_extension_count: 0,
                            id: 2,
                            question_round_number: 2,
                            question_round_state: 1,
                            state_name: 'question_answered',
                        },
                    ],
                    question_round_number: 2,
                    question_round_state: 1,
                },
            ]
            const result = index.formatRounds(rounds)
            expect(result).to.be.an('array')
            expect(result[0].expires.dateUtc).to.equal('1970-01-18T22:43:16Z')
        })
    })
    describe('updateRoundToIssued', () => {
        it('should call cohCor.putRound', () => {
            const hearingId = 1
            const roundId = 2
            const options = {}
            const stub = sinon.stub(cohCor, 'putRound')
            stub.returns(1)
            const result = index.updateRoundToIssued(hearingId, roundId, options)
            expect(result).to.eql(1)
            expect(stub).to.be.called
            stub.restore()
        })
    })
    describe('answerAllQuestions', () => {
        it('should return array', async () => {
            const hearingId = 1
            const questionIds = [1, 2, 3]
            const stub = sinon.stub(cohCor, 'postAnswer')
            stub.returns(1)
            const result = index.answerAllQuestions(hearingId, questionIds)
            expect(result).to.be.an('array')
            expect(result).to.eql([1, 1, 1])
            expect(stub).to.be.called
            stub.restore()
        })
    })
    describe('getQuestion', () => {
        it('should return array', async () => {
            const hearingId = 1
            const questionId = 2
            const options = {}
            const stub = sinon.stub(cohCor, 'getQuestion')
            const stub2 = sinon.stub(cohCor, 'getAnswers')
            stub.returns(1)
            stub2.returns(2)
            const result = await index.getQuestion(hearingId, questionId, options)
            expect(result).to.be.an('array')
            expect(result).to.eql([1, 2])
            expect(stub).to.be.called
            stub.restore()
            stub2.restore()
        })
    })
    describe('createHearing', () => {
        it('should call cohCor.postHearing', async () => {
            const hearingId = 1
            const questionId = 2
            const options = {}
            const stub = sinon.stub(cohCor, 'postHearing')
            stub.resolves({ online_hearing_id: 666 })
            const result = await index.createHearing(hearingId, questionId, options)
            expect(result).to.eql(666)
            expect(stub).to.be.called
            stub.restore()
        })
    })
    describe('questionHandler', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                }
            }

            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub = sinon.stub(headerUtilities, 'getAuthHeaders')
            const stub2 = sinon.stub(cohCor, 'getHearingByCase')
            const stub3 = sinon.stub(cohCor, 'getQuestion')
            stub.returns({ 1: 1 })
            stub2.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub3.returns(
                {
                    current_question_state: {
                        state_datetime: 123,
                        state_name: 1,
                    },
                    owner_reference: 0,
                    question_body_text: 3,
                    question_header_text: 2,
                    question_id: 1,
                    question_round: 1,
                })
            const stub4 = sinon.stub(cohCor, 'getAnswers')
            const stub5 = sinon.stub(util, 'judgeLookUp')
            stub4.returns(4)
            stub5.returns(5)
            await index.questionHandler(req, res)
            expect(stub).to.be.called
            expect(stub2).to.be.called
            expect(stub3).to.be.called
            expect(stub4).to.be.called
            stub.restore()
            stub2.restore()
            stub3.restore()
            stub4.restore()
            stub5.restore()
        })
    })
    describe('questionsHandler', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'getAllRounds')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.returns(
                {
                    current_question_state: {
                        state_datetime: 123,
                        state_name: 1,
                    },
                    owner_reference: 0,
                    question_body_text: 3,
                    question_header_text: 2,
                    question_id: 1,
                    question_round: 1,
                    question_rounds: [
                        {
                            deadline_extension_count: 0,
                            question_references: [{
                                current_question_state: {
                                    state_name: 'question_answered'
                                },
                                deadline_expiry_date: 1550830278,
                            }],
                            question_round_number: 1,
                            question_round_state: {
                                state_name: 'question_answered',
                            },
                        },
                    ],
                })
            const stub3 = sinon.stub(util, 'judgeLookUp')
            stub3.returns(5)
            await index.questionsHandler(req, res)
            expect(stub1).to.be.called
            expect(stub2).to.be.called
            stub1.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('postQuestionsHandler', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'createHearing')
            const stub4 = sinon.stub(cohCor, 'getQuestions')

            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.returns({})
            stub4.resolves({
                    questions:
                        [
                            {
                                question_round: '1',
                                question_ordinal: '3',
                            },
                            {
                                question_round: '1',
                                question_ordinal: '2',
                                question_id: 'df064739-1c63-41ee-9cd7-2ba269afcfdd',
                            },
                            {
                                question_round: '2',
                                question_ordinal: '6',
                                question_id: '0c719657-4650-42c0-a5af-f1037d53a74e',
                            },
                            {
                                question_round: '2',
                                question_ordinal: '4',
                                question_id: 'c969f4ae-8a58-4d90-9ba5-f59a898de214',
                            },
                        ],
                    }
                )

            const stub3 = sinon.stub(cohCor, 'postQuestion')

            stub3.returns({})
            stub3.returns(5)
            await index.postQuestionsHandler(req, res)
            expect(stub1).to.be.called
            expect(stub3).to.be.called
            expect(stub4).to.be.called
            stub1.restore()
            stub2.restore()
            stub3.restore()
            stub4.restore()
        })
    })
    const testGetOrdinalNumber = questions => {

        if (!questions.questions.length) {
            return 0
        }

        const allQuestionOrdinals = questions.questions.map(question => question.question_ordinal as number)
        let highestOrdinal = Math.max(...allQuestionOrdinals)

        return ++highestOrdinal
    }

    /**
     * Response from CoH /continuous-online-hearings/${hearingId}/questions
     * @see cohQA.ts getQuestions
     */
    const questions = {
        questions:
            [
                {
                    question_round: '1',
                    question_ordinal: '3',
                },
                {
                    question_round: '1',
                    question_ordinal: '2',
                    question_id: 'df064739-1c63-41ee-9cd7-2ba269afcfdd',
                },
                {
                    question_round: '2',
                    question_ordinal: '6',
                    question_id: '0c719657-4650-42c0-a5af-f1037d53a74e',
                },
                {
                    question_round: '2',
                    question_ordinal: '4',
                    question_id: 'c969f4ae-8a58-4d90-9ba5-f59a898de214',
                },
            ],
    }

    const emptyQuestions = {
        questions: [],
    }

    describe('getOrdinalNumber', () => {

        it('should find the highest question ordinal number, so that we can increment the ordinal number.', () => {
            expect(getOrdinalNumber(questions)).to.equal(testGetOrdinalNumber(questions))
        })

        it('should return a 0 if there are no questions currently asked, so that the first question asked has an' +
            'ordinal number of 0.', () => {
            expect(getOrdinalNumber(emptyQuestions)).to.equal(testGetOrdinalNumber(emptyQuestions))
        })
    })

    describe('putQuestionsHandler', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'createHearing')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.returns({})
            const stub3 = sinon.stub(cohCor, 'putQuestion')
            stub3.returns({})
            stub3.returns(5)
            await index.putQuestionsHandler(req, res)
            expect(stub1).to.be.called
            expect(stub3).to.be.called
            stub1.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('deleteQuestionsHandler', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'createHearing')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.returns({})
            const stub3 = sinon.stub(cohCor, 'deleteQuestion')
            stub3.returns({})
            stub3.returns(5)
            await index.deleteQuestionsHandler(req, res)
            expect(stub1).to.be.called
            expect(stub3).to.be.called
            stub1.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('putRounds', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'createHearing')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.returns({})
            const stub3 = sinon.stub(cohCor, 'putRound')
            stub3.returns({})
            stub3.returns(5)
            await index.putRounds(req, res)
            expect(stub1).to.be.called
            expect(stub3).to.be.called
            stub1.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('getRounds', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'putRound')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.returns({})
            const stub3 = sinon.stub(cohCor, 'getAllRounds')
            stub3.returns({})
            stub3.returns(5)
            await index.getRounds(req, res)
            expect(stub1).to.be.called
            expect(stub3).to.be.called
            stub1.restore()
            stub2.restore()
            stub3.restore()
        })
    })
    describe('getRoundById', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'getRound')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.returns({})
            await index.getRoundById(req, res)
            expect(stub1).to.be.called
            expect(stub2).to.be.called
            stub1.restore()
            stub2.restore()
        })
    })
    describe('getRoundAndAnswer', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'getQuestions')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
                status: 200,
            })
            stub2.resolves({ questions: [{ question_round: 1, current_question_state: { state_name: 'question_issued' } }] })
            await index.getRoundAndAnswer(req, res)
            expect(stub1).to.be.called
            expect(stub2).to.be.called
            stub1.restore()
            stub2.restore()
        })
    })
    describe('getRoundAndHalfAnswer', () => {
        it('should call stubbed functions', async () => {
            const req = {
                auth: {
                    token: 0,
                },
                body: {}
                ,
                headers: {
                    ServiceAuthorization: 1,
                },
                params: {
                    case_id: 1,
                    question_id: 2,
                },
                session: {
                    user: {
                        email: 'a@a.com',
                    },
                },
            }
            const res = {
                end: function () {
                },
                status: function (s) {
                    return this
                },
                send: x => x,
                setHeader: () => false,
            }
            const stub1 = sinon.stub(cohCor, 'getHearingByCase')
            const stub2 = sinon.stub(cohCor, 'getQuestions')
            stub1.resolves({
                online_hearings: [
                    {
                        online_hearing_id: 1,
                    },
                ],
            })
            stub2.resolves({ questions: [{ question_round: 1, current_question_state: { state_name: 'question_issued' } }] })
            await index.getRoundAndHalfAnswer(req, res)
            expect(stub1).to.be.called
            expect(stub2).to.be.called
            stub1.restore()
            stub2.restore()
        })
    })
})
