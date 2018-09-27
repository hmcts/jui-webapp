function caseStateFilter(caseData) {
    return caseData.state !== 'continuous_online_hearing_decision_issued'
        && caseData.state !== 'question_issued';
}

module.exports.COH_STATE = 'continuous_online_hearing_started';

module.exports.Q_DEADLINE_ELAPSED_STATE = 'question_deadline_elapsed';

module.exports.Q_DEADLINE_EXT_ELAPSED_STATE = 'question_deadline_extension_elapsed';

module.exports.DECISION_ISSUED_STATE = 'continuous_online_hearing_decision_issued';

module.exports.RELISTED_STATE = 'continuous_online_hearing_relisted';

module.exports.caseStateFilter = caseStateFilter;
