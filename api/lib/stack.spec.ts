import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)
import {Store} from './store/store'

import {pushStack, stackEmpty} from './stack'

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
        it('Should construct value to push to store', async () => {
            const stack = [1, 2, 3]
            const spy = sinon.spy(Store.prototype, 'set')
            await pushStack(req, stack)
            expect(spy).to.be.calledWith('decisions_stack_123_3_321', [1, 2, 3])
            spy.restore()
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
})
