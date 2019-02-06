import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)
import {Store} from './store/store'

import {forwardStack, pushStack, shiftStack, stackEmpty} from './stack'

const req = {
    params: {
        'caseId': '321',
        'caseTypeId': '3',
        'jurId': '123',
    },
    session: {
        'foo': 'bar',
    },
}

describe('stack', () => {
    describe('pushStack', () => {
        // @todo should this accept null? Cannot concat null - also, converts stack to string?! - L21
        it('Should construct value to push to store', async () => {
            const stack = [1, 2, 3]
            const spy = sinon.spy(Store.prototype, 'set')
            await pushStack(req, stack)
            // @ts-ignore
            expect(spy).to.be.calledWith('decisions_stack_123_3_321', [1, 2, 3])
            spy.restore()
        })
        it('Should construct newStack to push to store if nothing to get in store', async () => {
            const stack = [1, 2, 3]
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns('')
            const spy = sinon.spy(Store.prototype, 'set')
            await pushStack(req, stack)
            // @ts-ignore
            expect(spy).to.be.calledWith('decisions_stack_123_3_321', '1,2,3')
            spy.restore()
            stub.restore()
        })
    })
    describe('shiftStack', () => {
        //@todo - NEEDS WORK - check this with a real 'variables' object
        it('Should return the current item', async () => {
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([1, 2, 3])
            const variables = ['decisions_stack_123_3_321']
            const result = await shiftStack(req, variables)
            expect(result).to.equal(3)
            stub.restore()
        })
        it('Should return the last item of array if simple array is passed', async () => {
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([1, 2, 3])
            const variables = []
            const result = await shiftStack(req, variables)
            expect(result).to.equal(3)
            stub.restore()
        })
        it('Should return the last item of array if simple array of objects is passed', async () => {
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([{k: 1}, {k: 2}, {K: 3}])
            const variables = []
            const result = await shiftStack(req, variables)
            expect(result).to.equal(3)
            stub.restore()
        })
        it('Should return the first item of array if simple array of objects is passed with matching variable key', async () => {
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns([{k: 1}, {k: 2}, {k: 3}])
            const variables = {1: 'k', k: 1}
            const result = await shiftStack(req, variables)
            expect(result).to.equal(1)
            stub.restore()
        })
    })
    describe('stackEmpty', () => {
        it('Should return false if stack is not empty', async () => {
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns('decisions_stack_123_3_321')
            const result = await stackEmpty(req)
            expect(result).to.equal(false)
            stub.restore()

        })
        it('Should return if stack is empty', async () => {
            const stub = sinon.stub(Store.prototype, 'get')
            stub.returns(false)
            const result = await stackEmpty(req)
            expect(result).to.equal(true)
            stub.restore()

        })
    })
    describe('forwardStack', () => {
        it('Should return shallow portion of original register', () => {
            //@todo - NEEDS WORK - look into what map function is doing
            const register = [{
                event: 'continue',
                states: [
                    {
                        conditions: [
                            {
                                condition: [{makeDecision: 'yes'}],
                                result: 'costs-order',
                            },
                            {
                                condition: [{makeDecision: 'no'}],
                                result: 'provide-reason',
                            },
                        ],
                        state: 'create',
                    },
                    {
                        result: 'check-your-answers',
                        state: 'cost-order',
                    },

                ],
            }]
            const stateId = 'cost-order'
            const result = forwardStack(register, stateId)
            expect(result).to.be.an('array')
        })
    })
})
