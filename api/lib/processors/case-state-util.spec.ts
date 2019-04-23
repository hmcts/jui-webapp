
    import * as chai from 'chai'
    import 'mocha'
    import { expect } from 'chai'
    import * as sinonChai from 'sinon-chai'
    import * as caseStateUtil from './case-state-util'
    import {GO_TO} from './case-state-util'

    chai.use(sinonChai)

    describe('CASE STATE ', () => {
    it('should  STATE  have the correct properties', () => {
        expect(caseStateUtil.STATE.FR_CCD_REFER_TO_JUDGE_STATE).to.exist
        expect(caseStateUtil.STATE.SSCS_CCD_APPEAL_CREATED).to.exist
        expect(caseStateUtil.STATE.COH_STARTED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_DECISION_ISSUED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_PRELIMINARY_VIEW_ISSUED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_PRELIMINARY_VIEW_PENDING_STATE).to.exist
        expect(caseStateUtil.STATE.COH_RELISTED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_RELISTED_PENDING).to.exist
        expect(caseStateUtil.STATE. COH_Q_QUESTION_DRAFTED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_Q_QUESTION_ISSUE_PENDING_STATE).to.exist
        expect(caseStateUtil.STATE.COH_Q_QUESTION_ISSUED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_Q_DEADLINE_ELAPSED_STATE).to.exist
        expect(caseStateUtil.STATE. COH_Q_DEADLINE_EXT_ELAPSED_STATE).to.exist
        expect(caseStateUtil.STATE. COH_Q_QUESTION_DEADLINE_EXTENTION_GRANTED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_Q_QUESTION_DEADLINE_EXTENSION_DENIED_STATE).to.exist
        expect(caseStateUtil.STATE.COH_A_QUESTION_ANSWERED_STATE).to.exist
        expect(caseStateUtil.STATE.SSCS).to.exist
        expect(caseStateUtil.STATE.FR).to.exist
        expect(caseStateUtil.STATE.DIV).to.exist
        expect(caseStateUtil.STATE.PRO).to.exist
        expect(caseStateUtil.STATE.CMC).to.exist
    })
})
describe('GO_TO', () => {
    it('should have GO_TO constants', () => {
        expect(caseStateUtil.GO_TO.SUMMARY_GO_TO).to.equal('summary')
        expect(caseStateUtil.GO_TO.PARTIES_GO_TO).to.equal('parties')
        expect(caseStateUtil.GO_TO.CASE_FILE_GO_TO).to.equal('casefile')
        expect(caseStateUtil.GO_TO.TIMELINE_GO_TO).to.equal('timeline')
        expect(caseStateUtil.GO_TO.QUESTIONS_GO_TO).to.equal('questions')
        expect(caseStateUtil.GO_TO.DECISION_GO_TO).to.equal('decision')
    })
})
describe('GO_TO', () => {
    it('should have GO_TO constants', () => {
        expect(caseStateUtil.GO_TO.SUMMARY_GO_TO).to.exist
        expect(caseStateUtil.GO_TO.PARTIES_GO_TO).to.exist
        expect(caseStateUtil.GO_TO.CASE_FILE_GO_TO).to.exist
        expect(caseStateUtil.GO_TO.TIMELINE_GO_TO).to.exist
        expect(caseStateUtil.GO_TO.QUESTIONS_GO_TO).to.exist
        expect(caseStateUtil.GO_TO.DECISION_GO_TO).to.exist
    })
})

describe('stateToBeShown', () => {
    it('should be a type of array ', () => {
        expect(caseStateUtil.caseStateFilter).to.exist
    })
})

describe('createCaseState', () => {
    it('should return and object with properties: stateName, StateDateTime, actionGoTo ID', () => {

        expect(caseStateUtil.createCaseState('a', 'b', 'c', null)).to.deep.equal({
            stateName: 'a',
            stateDateTime: 'b',
            actionGoTo: 'c',
            ID: null,
        })
    })
})
describe('getDocId', () => {
    it('getDocId', () => {
        expect(caseStateUtil.getDocId({document_url: '/helpme' })).to.equal('helpme')
    })
})
