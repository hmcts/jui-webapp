import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
import * as decisionsIndex from './index'
import * as cohDecisionsRoutes from './cohDecisions'
import * as states from './states'

describe('Decisions', () => {
    it('should have called cohDecisionRoutes Method', () => {
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(cohDecisionsRoutes, 'default')
        const stubstates = sandbox.stub(states, 'default')
        decisionsIndex.default('test')
        expect(stub).to.have.been.called
        sandbox.restore()
    })
})
