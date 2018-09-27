function caseStateFilter(caseData) {
    return caseData.state !== 'continuous_online_hearing_decision_issued'
        && caseData.state !== 'question_issued';
}

module.exports.caseStateFilter = caseStateFilter;
