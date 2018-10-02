const DECISION_ISSUED = 'continuous_online_hearing_decision_issued';
const RELISTED = 'continuous_online_hearing_relisted';

function caseStateFilter(caseData) {
    const stateName = caseData.state.stateName;
    return stateName !== DECISION_ISSUED
        && stateName !== RELISTED
        && stateName !== 'question_issue_pending'
        && stateName !== 'question_issued';
}

function createCaseState(state, date, actionUrl) {
    return {
        stateName: state,
        stateDateTime: date,
        actionGoTo: actionUrl
    };
}

const CONSTANTS = {
    COH_STATE: 'continuous_online_hearing_started',
    Q_DEADLINE_ELAPSED_STATE: 'question_deadline_elapsed',
    Q_DEADLINE_EXT_ELAPSED_STATE: 'question_deadline_extension_elapsed',
    DECISION_ISSUED_STATE: DECISION_ISSUED,
    RELISTED_STATE: RELISTED,
    REFER_TO_JUDGE: 'referredToJudge',
    QUESTIONS_GO_TO: 'questions',
    CASE_FILE_GO_TO: 'casefile'
};

module.exports.CONSTANTS = CONSTANTS;

module.exports.COH_STATE = 'continuous_online_hearing_started';

module.exports.Q_DEADLINE_ELAPSED_STATE = 'question_deadline_elapsed';

module.exports.Q_DEADLINE_EXT_ELAPSED_STATE = 'question_deadline_extension_elapsed';

module.exports.DECISION_ISSUED_STATE = DECISION_ISSUED;

module.exports.RELISTED_STATE = RELISTED;

module.exports.QUESTIONS_GO_TO = 'questions';

module.exports.CASE_FILE_GO_TO = 'casefile';

module.exports.caseStateFilter = caseStateFilter;

module.exports.createCaseState = createCaseState;
