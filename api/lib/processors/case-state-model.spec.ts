import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)
// below this line you  ut imports to do with our code. Above this line are all testing i ports
import * as log4js from 'log4js'
import * as caseStateModule from './case-state-model'
import * as caseStateUtil from './case-state-util'
import * as util from '../util'
import { GO_TO, STATE, createCaseState, getDocId } from './case-state-util'

describe('DEFAULT_CCD_STATE', () => {
    it('Should return true', () => {
        const context = {}
        expect(caseStateModule.DEFAULT_CCD_STATE.when(context)).to.be.true
    })
    it('should give an outcome and ccdCohStateCheck', () => {
        const context = {
            caseData:{ccdState: 'test'}
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.DEFAULT_CCD_STATE.then(context)
        console.log('caseStateModule.DEFAULT_CCD_STATE', caseStateModule.DEFAULT_CCD_STATE)
        expect(caseStateUtil.createCaseState).to.have.been.called
        // expect(caseStateModule.DEFAULT_CCD_STATE).to.eventually.equal(true)
        sandbox.restore()
    })
})
describe('ccdFinalDecisionState', () => {
    it('Should return false', () => {
        const context = {
            caseData: {decisionNotes: 'test'}
        }
        expect(caseStateModule.ccdFinalDecisionState.when(context)).to.be.true
    })
    it('should give an stop to true', () => {
        const context = {
            caseData: {decisionNotes: 'test'}
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.ccdFinalDecisionState.then(context)
        expect(caseStateUtil.createCaseState).to.have.been.called
        sandbox.restore()
    })
})
describe('cohState', () => {
    it('Should return boolean undefined', () => {
        const context = {
            caseData: {
                hearingData: {
                        current_state: { state_name: 'welcome' }
                }
            }
        }
        expect(caseStateModule.cohState.when(context)).to.be.undefined
    })
    it('Should state_name have a string and return false', () => {
        const context = {
            caseData: {
                hearingData: {
                    current_state: { state_name: 'welcome' }
                }
            },
            ccdCohStateCheck: 'ttest'
        }
        expect(caseStateModule.cohState.when(context)).to.be.false
    })
    it('Should state_name have a string and return false', () => {
        const context = {
            caseData: {
                hearingData: {
                    current_state: { state_name: 'welcome' }
                }
            },
            ccdCohStateCheck: 'test'
        }
        const STATE = {
            COH_STARTED_STATE: 'welcome'
        }
        expect(caseStateModule.cohState.when(context)).to.be.false
    })
    it('createCaseState should be called', () => {
        const context = {
            caseData: {
                hearingData: {
                    current_state: { state_name: 'welcome' }
                }
            },
            ccdCohStateCheck: 'test'
        }
        const STATE = {
            COH_STARTED_STATE: 'welcome'
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.ccdFinalDecisionState.then(context)
        expect(caseStateUtil.createCaseState).to.have.been.called
        sandbox.restore()
    })
})
describe('questionState', () => {
    it('', () => {
        const context = {
            caseData: {latestQuestions: [{ state: true }]}
        }
        expect(caseStateModule.questionState.when(context)).to.be.undefined
    })
    it('', () => {
        const context = {
            caseData: {latestQuestions: {questions : [{ state: true }]}  },
            cohStateCheck: true
        }
        expect(caseStateModule.questionState.when(context)).to.be.true
    })
    it('should give an stop to true', () => {
        const context = {
            caseData: {decisionNotes: 'test'}
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.ccdFinalDecisionState.then(context)
        expect(caseStateUtil.createCaseState).to.have.been.called
        sandbox.restore()
    })
})

describe('cohPreliminaryViewState', () => {
    it('deadlineElapsed on when to return true', () => {
        const context = {
            caseData: {
                latestQuestions: {
                    state: 'question_deadline_elapsed'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('decision_issued')
        caseStateModule.cohPreliminaryViewState.when(context)
        expect(caseStateModule.deadlineElapsed.when(context)).to.be.true
        sandbox.restore()
    })
    it('deadlineElapsed on when to return false', () => {
        const context = {
            caseData: {
                latestQuestions: {
                    state: 'dddddd'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('ddddddd')
        caseStateModule.cohPreliminaryViewState.when(context)
        expect(caseStateModule.cohPreliminaryViewState.when(context)).to.be.false
        sandbox.restore()
    })
    it('deadlineElapsed on when to return false', () => {
        const context = {
            caseData: {
                hearingData: {
                    current_state: {
                        state_name: 'continuous_online_hearing_decision_issued'
                    }
                },
                latestQuestions: {
                    questions : [{ state: true }],
                    state: 'dddddd'
                },
            },
            cohStateCheck: true,
            stop: false
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.cohPreliminaryViewState.then(context)
        expect(context.stop).to.be.true
        sandbox.restore()
    })
})


describe('cohDecisionState', () => {
    it('cohDecisionState on when to return true', () => {
        const context = {
            caseData: {
                hearingData: {
                    current_state: {
                        state_name: 'continuous_online_hearing_decision_issued'
                    }
                },
                latestQuestions: {
                    state: 'question_deadline_elapsed'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('decision_issued')
        caseStateModule.cohDecisionState.when(context)
        expect(caseStateModule.cohDecisionState.when(context)).to.be.true
        sandbox.restore()
    })
    it('cohDecisionState on when to return false', () => {
        const context = {
            caseData: {
                hearingData: {
                    current_state: {
                        state_name: 'failing'
                    }
                },
                latestQuestions: {
                    state: 'question_deadline_elapsed'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('decision_issued')
        caseStateModule.cohDecisionState.when(context)
        expect(caseStateModule.cohDecisionState.when(context)).to.be.false
        sandbox.restore()
    })
})

describe('cohRelistState', () => {
    it('cohRelistState on when to return true', () => {
        const context = {
            caseData: {
                hearingData: 'continuous_online_hearing_relisted',
                latestQuestions: {
                    state: 'question_deadline_elapsed'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('continuous_online_hearing_relisted')
        caseStateModule.cohRelistState.when(context)
        expect(caseStateModule.cohRelistState.when(context)).to.be.true
        sandbox.restore()
    })
    it('cohRelistState on when to return true', () => {
        const context = {
            caseData: {
                hearingData: 'ISSUE_PENDING',
                latestQuestions: {
                    state: 'question_deadline_elapsed'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('ISSUE_PENDING')
        caseStateModule.cohRelistState.when(context)
        expect(caseStateModule.cohRelistState.when(context)).to.be.true
        sandbox.restore()
    })
    it('cohRelistState on when to return true', () => {
        const context = {
            caseData: {
                hearingData: 'something',
                latestQuestions: {
                    state: 'question_deadline_elapsed'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('something')
        caseStateModule.cohRelistState.when(context)
        expect(caseStateModule.cohRelistState.when(context)).to.be.false
        sandbox.restore()
    })
})
describe('referredToJudge', () => {
    it('referredToJudge on when to return true', () => {
        const context = {
            caseData: {
                ccdState: 'referredToJudge'
            },
            cohStateCheck: true
        }
        caseStateModule.referredToJudge.when(context)
        expect(caseStateModule.cohRelistState.when(context)).to.be.false
    })
})


describe('conditionProcessor', () => {
    it('conditionProcessor', () => {
        expect(1).to.be.false
    })
})

describe('processEngineMap', () => {
    it('processEngineMap', () => {
        expect(caseStateUtil.processEngineMap.sscs.benefit.stateConditions).to.exist
    })
})
