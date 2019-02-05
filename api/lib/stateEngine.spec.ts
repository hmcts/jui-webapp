import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import * as stack from '../lib/stack'
import {getRegister, handleCondition, handleInstruction, handleState, process} from './stateEngine'
import * as store from './store/store'
import {Store} from './store/store'
import * as util from './util'

describe('stateEngine', () => {
    describe('handleCondition', () => {
        it('Should return null if variable key does not match conditionNode key', () => {
            const conditionNode = {
                condition: [
                    {condition1: 1},
                ],
            }
            const variables = []
            const result = handleCondition(conditionNode, variables)
            expect(result).to.equal(null)
        })
        it('Should return a result if variable key does match conditionNode key', () => {
            const conditionNode = {
                condition: [
                    {1: 'condition1'},
                ], result: 'result',
            }
            const variables = {1: 'condition1'}
            const result = handleCondition(conditionNode, variables)
            expect(result).to.equal('result')
        })
    })
    describe('handleState', () => {
        it('Should return null if stateNode has no properties', () => {
            const stateNode = {}
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(null)
        })
        it('Should return with handleCondition if stateNode containing condition is passed', () => {
            const stateNode = {
                condition: [
                    {1: 'condition1'},
                ],
            }
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(null)
        })
        it('Should return with some() if stateNode containing conditions is passed', () => {
            const stateNode = {
                conditions: [
                    {
                        condition: [
                            {1: 'condition1'},
                        ],
                    },
                    {
                        condition: [
                            {2: 'condition2'},
                        ],
                    },
                ],
                state: 2,
            }
            const spySome = sinon.spy(util, 'some')
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(null)
            expect(spySome).to.be.called
        })
        it('Should return with stateNode.result if stateNode.result is passed', () => {
            const stateNode = {
                result: 1,
                state: 2,
            }
            const variables = []
            const result = handleState(stateNode, variables)
            expect(result).to.equal(stateNode.result)
        })
    })
    describe('handleInstruction', () => {
        // @todo - The function returns null but code can't be reached - line 53
        it('Should return instruction.result if other conditions aren\'t satisfied', () => {
            const instruction = {result: 1}
            const stateId = {}
            const variables = []
            const result = handleInstruction(instruction, stateId, variables)
            expect(result).to.equal(1)
        })
        it('Should return handleState (instruction.result) if instruction.state === stateId', () => {
            const instruction = {result: 1, state: 1}
            const stateId = 1
            const variables = []
            const result = handleInstruction(instruction, stateId, variables)
            expect(result).to.equal(1)
        })
        it('Should return handleState if instruction.states and predicate', () => {
            // @todo - look at this test!
            const instruction = {event: 0, result: 1, states: [{state: 1}, {state: 2}]}
            const stateId = 2
            const variables = [1, 2, 3]
            const result = handleInstruction(instruction, stateId, variables)
            expect(result).to.equal(null)
        })
    })
    describe('getRegister', () => {
        it('Should return empty filtered mapping if \'register\' property is missing', () => {
            const mapping = [
                {
                    event: 'continue',
                },
            ]
            const result = getRegister(mapping)
            expect(result).to.be.empty
        })
        it('Should return filtered mapping if \'register\' property is present', () => {
            const mapping = [
                {
                    event: 'continue',
                    register: true,
                },
            ]
            const result = getRegister(mapping)
            expect(result).to.not.be.empty
        })
    })
    describe('process', () => {
        it('Should save a session if \'GET\'', async () => {
            const req = {
                body: {
                    event: {},
                },
                method: 'GET',
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 321,
                    stateId: 2,
                },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue',
                },
            ]
            const stub = sinon.stub(req.session, 'save')
            stub.returns(1)
            const res = null
            const payload = []
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(stub).to.be.called
            stub.restore()
        })
        it('Should save a session if \'POST\' but instruction.event !== event', async () => {
            const req = {
                body: {
                    event: {},
                },
                method: 'POST',
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 321,
                    stateId: 2,
                },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue',
                },
            ]
            const stub = sinon.stub(req.session, 'save')
            stub.returns(1)
            const res = null
            const payload = []
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(stub).to.be.called
            stub.restore()
        })
        it('Should set Store if variables', async () => {
            const req = {
                body: {
                    event: {},
                    formValues: {1: 1, 2: 2},
                },
                method: 'POST',
                params:
                    {
                        caseId: 123,
                        caseTypeId:
                            'Divorce',
                        jurId:
                            321,
                        stateId:
                            2,
                    },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue',
                },
            ]
            const stubSet = sinon.stub(Store.prototype, 'set')
            const stubGet = sinon.stub(Store.prototype, 'get')
            stubGet.returns({3: 3, 4: 4})
            const res = null
            const payload = []
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(stubSet).to.be.called
            expect(stubSet).to.be.calledWith('decisions_321_divorce_123', {1: 1, 2: 2, 3: 3, 4: 4})
            stubGet.restore()
            stubSet.restore()
        })
        it('Should set result to handleInstruction() and save session if instruction.event === event', async () => {
            const req = {
                body: {
                    event: 'continue', name: 'continue', result: 1, state: 2,
                },
                method: 'POST',
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 321,
                    stateId: 2,
                },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue', name: 'continue', result: 1, state: 2,
                },
            ]
            const s2 = sinon.stub(req.session, 'save')
            s2.returns(1)
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([1, 2, 3])
            const res = null
            const payload = []
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(s2).to.be.called
            stub.restore()
        })
        it('Should set result save session if result === [state]', async () => {
            const req = {
                body: {
                    event: 'continue', name: 'continue', result: '[state]', state: 2,
                },
                method: 'POST',
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 321,
                    stateId: 2,
                },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue', name: 'continue', result: '[state]', state: 2,
                },
            ]
            const s2 = sinon.stub(req.session, 'save')
            s2.returns(1)
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([1, 2, 3])
            const res = null
            const payload = []
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(s2).to.be.called
            stub.restore()
        })
        it('Should not set result save session if result === \'.\'', async () => {
            const req = {
                body: {
                    event: 'continue', name: 'continue', result: '.', state: 2,
                },
                method: 'POST',
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 321,
                    stateId: 2,
                },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue', name: 'continue', result: '.', state: 2,
                },
            ]
            const s2 = sinon.stub(req.session, 'save')
            s2.returns(1)
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([1, 2, 3])
            const res = null
            const payload = () => false
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(s2).to.not.be.called
            stub.restore()
        })
        it('Should call shiftStack and pushStack if result === \'<register>\'', async () => {
            const req = {
                body: {
                    event: 'continue', name: 'continue', register: 1, result: '<register>', state: 2,
                },
                method: 'POST',
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 321,
                    stateId: 2,
                },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue', name: 'continue', register: 1, result: '<register>', state: 2,
                },
            ]
            const pushStub = sinon.stub(stack, 'pushStack')
            const shiftStub = sinon.stub(stack, 'shiftStack')
            const s2 = sinon.stub(req.session, 'save')
            s2.returns(1)
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([1, 2, 3])
            const res = null
            const payload = []
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(pushStub).to.be.called
            expect(shiftStub).to.be.called
            pushStub.restore()
            shiftStub.restore()
            stub.restore()
        })
        it('Should call stackEmpty and shiftStack if result === \'...\'', async () => {
            const req = {
                body: {
                    event: 'continue', name: 'continue', register: 1, result: '...', state: 2,
                },
                method: 'POST',
                params: {
                    caseId: 123,
                    caseTypeId: 'Divorce',
                    jurId: 321,
                    stateId: 2,
                },
                session: {
                    save: () => {
                        return false
                    },
                },
            }
            const mapping = [
                {
                    event: 'continue', name: 'continue', register: 1, result: '...', state: 2,
                },
            ]
            const emptyStub = sinon.stub(stack, 'stackEmpty')
            const shiftStub = sinon.stub(stack, 'shiftStack')
            const s2 = sinon.stub(req.session, 'save')
            s2.returns(1)
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([1, 2, 3])
            const res = null
            const payload = []
            const templates = {'divorce': {1: 123, 2: 321}}
            const theStore = new store.Store(req)
            await process(req, res, mapping, payload, templates, theStore)
            expect(emptyStub).to.be.called
            expect(shiftStub).to.be.called
            emptyStub.restore()
            shiftStub.restore()
            stub.restore()
        })
    })
})
