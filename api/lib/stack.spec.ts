import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)
import {Store} from './store/store'

import {pushStack} from './stack'

describe('stack', () => {
    describe('pushStack', () => {
        it('Should construct value to push to store', async () => {
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
            const stack = [1, 2, 3]
            sinon.spy(Store.prototype, 'set')
            await pushStack(req, stack)
            expect(Store.prototype.set).to.be.calledWith('decisions_stack_123_3_321', [1, 2, 3])
        })
    })
})
