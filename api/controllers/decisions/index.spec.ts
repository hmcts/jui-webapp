import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock'

chai.use(sinonChai)

import * as cohDecisions from './cohDecisions'
import * as index from './index'
import * as states from './states'

describe('index', () => {
    it('Should call \'states\' and \'cohDecisions\'', () => {
        const app = {}
        const stubCohDecisionRoutes = sinon.stub(cohDecisions, 'default')
        const stubStates = sinon.stub(states, 'default')
        index.default(app)
        expect(stubStates).to.be.called
        expect(stubCohDecisionRoutes).to.be.called
    })
})
