// to make it easier to understand states please do the following
// where does this state come from is it
// CCD ? COH
// if it COH then is just a COH one or is it Question (COH_Q) or an Answer state (COH_A)
// Could go one step more and say is a DIV_CCD or SSCS_COH (Divorce state from CCD or SSCS state from COH)
// alway suffix with STATE to make it easy to find.
const STATE = {
    FR_CCD_REFER_TO_JUDGE_STATE: 'referredToJudge',
    SSCS_CCD_APPEAL_CREATED: 'appealCreated',
    COH_STARTED_STATE: 'continuous_online_hearing_started',
    COH_DECISION_ISSUED_STATE: 'continuous_online_hearing_decision_issued',
    COH_RELISTED_STATE: 'continuous_online_hearing_relisted',
    COH_Q_QUESTION_DRAFTED_STATE: 'question_drafted',
    COH_Q_QUESTION_ISSUE_PENDING_STATE: 'question_issue_pending',
    COH_Q_QUESTION_ISSUED_STATE: 'question_issued',
    COH_Q_DEADLINE_ELAPSED_STATE: 'question_deadline_elapsed',
    COH_Q_DEADLINE_EXT_ELAPSED_STATE: 'question_deadline_extension_elapsed',
    COH_Q_QUESTION_DEADLINE_EXTENTION_GRANTED_STATE: 'question_deadline_extension_granted',
    COH_Q_QUESTION_DEADLINE_EXTENSION_DENIED_STATE: 'question_deadline_extension_denied',
    COH_A_QUESTION_ANSWERED_STATE: 'question_answered',
    SSCS: [
        'appealCreated',
        'continuous_online_hearing_started',
        'continuous_online_hearing_decision_issued',
        'question_drafted',
        'question_issued',
        'question_answered',
        'question_deadline_elapsed',
        'question_deadline_extension_elapsed',
        'question_deadline_extension_granted'
    ],
    FR: [
        'consentOrderMade',
        'awaitingPaymentResponse',
        'awaitingHWFDecision',
        'caseAdded',
        'consentOrderApproved',
        'referredToJudge',
        'applicationIssued'
    ],
    DIV: [
        'AwaitingPayment',
        'AosAwaiting',
        'AosStarted',
        'AosCompletedAwaitingAnswer',
        'AosCompleted',
        'AwaitingHWFDecision',
        'AwaitingDecreeNisi'
    ],
    PRO: [
        'BOExamining',
        'PAAppCreated',
        'CasePrinted',
        'CaseCreated',
        'CasePaymentFailed'
    ],
    CMC: ['open']

}

// at the moment these are all the main place you can go.
// maybe in the future we should have one for listing and making decision to align with more boxwork functions
const GO_TO = {
    SUMMARY_GO_TO: 'summary',
    PARTIES_GO_TO: 'parties',
    CASE_FILE_GO_TO: 'casefile',
    TIMELINE_GO_TO: 'timeline',
    QUESTIONS_GO_TO: 'questions',
    DECISION_GO_TO: 'decision'
}

// these are state a judge should be able to see.
const stateToBeShown = [
    STATE.FR_CCD_REFER_TO_JUDGE_STATE,
    STATE.COH_STARTED_STATE,
    STATE.COH_Q_QUESTION_DRAFTED_STATE,
    STATE.COH_Q_QUESTION_ISSUE_PENDING_STATE,
    STATE.COH_Q_DEADLINE_ELAPSED_STATE,
    STATE.COH_Q_DEADLINE_EXT_ELAPSED_STATE,
    STATE.COH_A_QUESTION_ANSWERED_STATE,
    ...[...STATE.SSCS],
    ...[...STATE.FR],
    ...[...STATE.DIV],
    ...[...STATE.CMC],
    ...[...STATE.PRO]
]

function caseStateFilter(caseData) {
    return stateToBeShown.find(toBeFiltered => caseData.state.stateName === toBeFiltered)
}

function createCaseState(state, date, actionUrl, id) {
    return {
        stateName: state,
        stateDateTime: date,
        actionGoTo: actionUrl || GO_TO.SUMMARY_GO_TO,
        ID: id
    }
}

function getDocId(consentOrder) {
    const splitURL = consentOrder.document_url.split('/')
    return splitURL[splitURL.length - 1]
}

module.exports = {
    STATE,
    GO_TO,
    caseStateFilter,
    createCaseState,
    getDocId
}
