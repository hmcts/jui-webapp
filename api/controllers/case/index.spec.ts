import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import * as ccdStore from '../../services/ccd-store-api/ccd-store'
import * as cohCorApi from '../../services/coh-cor-api/coh-cor-api'
import * as events from '../events'
import * as questions from '../questions/index'
import * as utils from '../../lib/util'
import {getCaseWithEventsAndQuestions} from './index'

describe('index', () => {
    describe('getCaseWithEventsAndQuestions', () => {
        it('should return an array', async () => {
            const userId = 1
            const jurisdiction = 'SSCS'
            const caseType = 2
            const caseId = 3
            const sandbox = sinon.createSandbox()
            const stub = sandbox.stub(ccdStore, 'getCCDCase')
            const stub2 = sandbox.stub(events, 'getEvents')
            const stub3 = sandbox.stub(cohCorApi, 'getHearingByCase')
            const stub4 = sandbox.stub(questions, 'getAllQuestionsByCase')
            const stub5 = sandbox.stub(utils, 'judgeLookUp')
            stub.resolves({case_data: {assignedToJudge: true, assignedToJudgeName: 'Judge Smith'}})
            stub2.resolves(2)
            stub3.resolves(3)
            stub4.resolves(4)
            stub5.returns(5)
            const result = await getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId)
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
            sandbox.restore()
        })
    })
})
