const CONSTANTS = {
    STATE: {
        COH_STATE: 'continuous_online_hearing_started',
        Q_DEADLINE_ELAPSED_STATE: 'question_deadline_elapsed',
        Q_DEADLINE_EXT_ELAPSED_STATE: 'question_deadline_extension_elapsed',
        DECISION_ISSUED_STATE: 'continuous_online_hearing_decision_issued',
        RELISTED_STATE: 'continuous_online_hearing_relisted',
        QUESTION_ISSUE_PENDING: 'question_issue_pending',
        QUESTION_ISSUED: 'question_issued',
        QUESTION_DEADLINE_EXTENTION_GRANTED: 'question_deadline_extension_granted',
        QUESTION_DEADLINE_EXTENSION_DENIED: 'question_deadline_extension_denied',
        REFER_TO_JUDGE_STATE: 'referredToJudge'
    },
    GO_TO: {
        QUESTIONS_GO_TO: 'questions',
        CASE_FILE_GO_TO: 'casefile',
        SUMMARY_GO_TO: 'summary',
        TIMELINE_GO_TO: 'timeline'
    }
};

const stateToBeFiltered = [
    'referredToJudge',
    'continuous_online_hearing_started', 'question_answered',
    'question_deadline_elapsed',
    'question_deadline_extension_elapsed',
    'question_drafted',
    CONSTANTS.STATE.DECISION_ISSUED_STATE,
    CONSTANTS.STATE.RELISTED_STATE,
    CONSTANTS.STATE.QUESTION_ISSUE_PENDING,
    CONSTANTS.STATE.QUESTION_ISSUED,
    CONSTANTS.STATE.QUESTION_DEADLINE_EXTENTION_GRANTED,
    CONSTANTS.STATE.QUESTION_DEADLINE_EXTENSION_DENIED
];

// We need to move more of this towards CCD.
function caseStateFilter(caseData) {
    return stateToBeFiltered.find(toBeFiltered => caseData.state.stateName === toBeFiltered);
}

function createCaseState(state, date, actionUrl, id) {
    return {
        stateName: state,
        stateDateTime: date,
        actionGoTo: actionUrl || CONSTANTS.GO_TO.SUMMARY_GO_TO,
        ID: id
    };
}

function getDocId(consentOrder) {
    const splitURL = consentOrder.document_url.split('/');
    return splitURL[splitURL.length - 1];
}

module.exports = {
    CONSTANTS,
    COH_STATE: CONSTANTS.STATE.COH_STATE,
    Q_DEADLINE_ELAPSED_STATE: CONSTANTS.STATE.Q_DEADLINE_ELAPSED_STATE,
    Q_DEADLINE_EXT_ELAPSED_STATE: CONSTANTS.STATE.Q_DEADLINE_EXT_ELAPSED_STATE,
    DECISION_ISSUED_STATE: CONSTANTS.STATE.DECISION_ISSUED_STATE,
    RELISTED_STATE: CONSTANTS.STATE.RELISTED_STATE,
    QUESTIONS_GO_TO: CONSTANTS.GO_TO.QUESTIONS_GO_TO,
    CASE_FILE_GO_TO: CONSTANTS.GO_TO.CASE_FILE_GO_TO,
    SUMMARY_GO_TO: CONSTANTS.GO_TO.SUMMARY_GO_TO,
    caseStateFilter,
    createCaseState,
    getDocId
};
