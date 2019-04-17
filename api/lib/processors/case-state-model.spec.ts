import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
import * as caseStateModule from './case-state-model'
import * as caseStateUtil from './case-state-util'
import * as util from '../util'
import { GO_TO, STATE, createCaseState, getDocId } from './case-state-util'
import {DEFAULT_CCD_STATE} from './case-state-model'

describe('DEFAULT_CCD_STATE', () => {
    it('Should assign true to context.when', () => {
        const context = {}
        expect(caseStateModule.DEFAULT_CCD_STATE.when(context)).to.be.true
    })
    it('Should assign true to context.when', () => {
        const context = {}
        const result = caseStateModule.DEFAULT_CCD_STATE.when(context)
        expect(result).to.be.true
    })
    it('should have called method createCaseState', () => {
        const context = {
            caseData:{ccdState: 'test'}
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.DEFAULT_CCD_STATE.then(context)
        expect(caseStateUtil.createCaseState).to.have.been.called
        sandbox.restore()
    })
})
describe('ccdFinalDecisionState', () => {
    it('should assign true to context.when', () => {
        const context = {
            caseData: {decisionNotes: 'test'}
        }
        expect(caseStateModule.ccdFinalDecisionState.when(context)).to.be.true
    })
    it('should assign true to context.then', () => {
        const context = {
            caseData: {decisionNotes: 'test'}
        }
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.ccdFinalDecisionState.then(context)
        expect(stub).to.be.called
        sandbox.restore()
    })
    it('should call method createCaseState()', () => {
        const context = {
            caseData: {decisionNotes: 'test'}
        }
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.ccdFinalDecisionState.then(context)
        expect(caseStateUtil.createCaseState).to.have.been.called
        expect(stub).to.be.called
        sandbox.restore()
    })
})
describe('cohState', () => {
    it('Should assign undefined to context.when', () => {
        const context = {
            caseData: {
                hearingData: {
                        current_state: { state_name: 'welcome' }
                }
            }
        }
        expect(caseStateModule.cohState.when(context)).to.be.undefined
    })
    it('Should assign false to context.when', () => {
        const context = {
            caseData: {
                hearingData: {
                    current_state: { state_name: 'welcome' }
                }
            },
            ccdCohStateCheck: 'test'
        }
        expect(caseStateModule.cohState.when(context)).to.be.false
    })
    it('Should assign false to context.when', () => {
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
    it('should have called method createCaseState', () => {
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
        const stub = sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.ccdFinalDecisionState.then(context)
        expect(caseStateUtil.createCaseState).to.have.been.called
        expect(stub).to.be.called
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
    it('Should assign true to context.when', () => {
        const context = {
            caseData: {latestQuestions: {questions : [{ state: true }]}  },
            cohStateCheck: true
        }
        expect(caseStateModule.questionState.when(context)).to.be.true
    })
    it('should have called createCaseState method ', () => {
        const context = {
            caseData: {decisionNotes: 'test'}
        }
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.ccdFinalDecisionState.then(context)
        expect(caseStateUtil.createCaseState).to.have.been.called
        expect(stub).to.be.called
        sandbox.restore()
    })
    it('should assign undefined to context.then', () => {
        const context = {
            caseData: {latestQuestions: {questions : [{ state: true, state_datetime: 'test' } ]}  },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(caseStateUtil, 'createCaseState').returns(
            {
                stateName: 'test',
                stateDateTime: 'test',
                actionGoTo: 'test',
                ID: 'test',
            }
        )
        caseStateModule.questionState.then(context)
        expect(caseStateModule.questionState.then(context)).to.be.undefined
        sandbox.restore()
    })
    it('should have called createCaseState method', () => {
        const context = {
            caseData: {latestQuestions: {questions : [{ state: true, state_datetime: 'test' } ]}  },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(caseStateUtil, 'createCaseState').returns(
            {
                stateName: 'test',
                stateDateTime: 'test',
                actionGoTo: 'test',
                ID: 'test',
            }
        )
        caseStateModule.questionState.then(context)
        expect(stub).to.be.called
        sandbox.restore()
    })
    it('should context.caseData have latestQuestions array', () => {
        const context = {
            caseData: {latestQuestions: {questions : [{ state: true, state_datetime: 'test' } ]}  },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(caseStateUtil, 'createCaseState').returns(
            {
                stateName: 'test',
                stateDateTime: 'test',
                actionGoTo: 'test',
                ID: 'test',
            }
        )
        caseStateModule.questionState.then(context)
        expect(context.caseData.latestQuestions).to.exist
        expect(context.caseData.latestQuestions.questions.length).to.equal(1)
        sandbox.restore()
    })
})

describe('cohPreliminaryViewState', () => {
    it('Should assign context.when to true', () => {
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
    it('should assign false to context.when', () => {
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
    it('Should have called method createCaseState in context.then', () => {
        const context = {
            caseData: {
                hearingData: {current_state: {state_name: 'continuous_online_hearing_decision_issued'}},
                latestQuestions: {
                    questions : [{ state: true }],
                    state: 'dddddd'
                },
            },
            cohStateCheck: true,
            stop: false
        }
        const sandbox = sinon.createSandbox()
        const stub = sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.cohPreliminaryViewState.then(context)
        expect(stub).to.be.called
        sandbox.restore()
    })
    it('Should assign true to context.stop on context.then', () => {
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
        const stub = sandbox.stub(caseStateUtil, 'createCaseState')
        caseStateModule.cohPreliminaryViewState.then(context)
        expect(context.stop).to.be.true
        sandbox.restore()
    })
})


describe('cohDecisionState', () => {
    it('Should assign true to context.when', () => {
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
    it('Should assign null to context.when', () => {
        const context = {
            caseData: {
                hearingData: null,
                latestQuestions: {
                    state: 'question_deadline_elapsed'
                },
            },
            cohStateCheck: true
        }
        const sandbox = sinon.createSandbox()
        sandbox.stub(util, 'valueOrNull').returns('decision_issued')
        caseStateModule.cohDecisionState.when(context)
        expect(caseStateModule.cohDecisionState.when(context)).to.be.null
        sandbox.restore()
    })
    it('Should assign false to context.when', () => {
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
    it('Should assign true to context.when', () => {
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
    it('Shoudl assign true to context.when', () => {
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
    it('Should assign to false to context.when', () => {
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
    it('Should assign false to context.when', () => {
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

describe('processEngineMap', () => {
    it('Should check for properties exist', () => {
        expect(caseStateModule.processEngineMap.sscs.benefit.stateConditions).to.exist
        expect(caseStateModule.processEngineMap.cmc.moneyclaimcase.stateConditions).to.exist
        expect(caseStateModule.processEngineMap.divorce.divorce.stateConditions).to.exist
        expect(caseStateModule.processEngineMap.divorce.financialremedymvp2.stateConditions).to.exist
    })
})
