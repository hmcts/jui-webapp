const { COH_STATE, Q_DEADLINE_ELAPSED_STATE, Q_DEADLINE_EXT_ELAPSED_STATE, DECISION_ISSUED_STATE, RELISTED_STATE } = require('./case-state-util');
const { createCaseState } = require('./case-state-util');

const ccdCohStateCondition = {
    init: () => {
        return {
            evaluate: context =>
                // don't know yet what would CCD state like for COH
                // context.caseData.ccdState === 'continuous_online_hearing_started'??;
                // TODO add check for ccd-state
                true,
            consequence: context => {
                context.outcome = createCaseState(context.caseData.ccdState, null, '');
                context.ccdCohStateCheck = true;
            }
        };
    }
};

const cohStateCondition = {
    init: () => {
        return {
            evaluate: context => {
                const hearingData = context.caseData.hearingData;
                const hearingState = (hearingData) ? hearingData.current_state.state_name : undefined;
                return context.ccdCohStateCheck && hearingState && hearingState === COH_STATE;
            },
            consequence: context => {
                context.cohStateCheck = true;
                const hearingData = context.caseData.hearingData;
                context.outcome = createCaseState(COH_STATE, hearingData.current_state.state_datetime, '');
            }
        };
    }
};

const questionStateCondition = {
    init: () => {
        return {
            evaluate: context => {
                const questionRound = context.caseData.questionRoundData;
                const questionState = questionRound && questionRound.questions && questionRound.questions[0].state;

                return context.cohStateCheck && questionState;
            },
            consequence: context => {
                const questionRound = context.caseData.questionRoundData;
                context.outcome = createCaseState(questionRound.questions[0].state, questionRound.questions[0].state_datetime, 'questions');
            }
        };
    }
};

const deadlineElapsedCondition = {
    init: () => {
        return {
            evaluate: context => {
                const questionRound = context.caseData.questionRoundData;
                return context.cohStateCheck && questionRound && questionRound.state === Q_DEADLINE_ELAPSED_STATE;
            },
            consequence: context => {
                const questionRound = context.caseData.questionRoundData;
                context.outcome = createCaseState(Q_DEADLINE_ELAPSED_STATE, questionRound.questions[0].state_datetime, 'questions');
            }
        };
    }
};

const deadlineExtensionExpiredCondition = {
    init: () => {
        return {
            evaluate: context => {
                const questionRound = context.caseData.questionRoundData;
                const questionDeadlineElapsed = context.cohStateCheck && questionRound && questionRound.state === Q_DEADLINE_ELAPSED_STATE;
                return questionDeadlineElapsed && questionRound.deadline_extension_count > 0;
            },
            consequence: context => {
                const questionRound = context.caseData.questionRoundData;
                context.outcome = createCaseState(Q_DEADLINE_EXT_ELAPSED_STATE, questionRound.questions[0].state_datetime, 'questions');
                context.stop = true;
            }
        };
    }
};

const cohDecisionStateCondition = {
    init: () => {
        return {
            evaluate: context => {
                const hearingData = context.caseData.hearingData;
                // TODO add check for ccd-state as well
                return hearingData && hearingData.current_state && hearingData.current_state.state_name === DECISION_ISSUED_STATE;
            },
            consequence: context => {
                const hearingData = context.caseData.hearingData;
                context.outcome = createCaseState(DECISION_ISSUED_STATE, hearingData.current_state.state_datetime, '');

                context.stop = true;
            }
        };
    }
};

const cohRelistStateCondition = {
    init: () => {
        return {
            evaluate: context => {
                const hearingData = context.caseData.hearingData;
                // TODO add check for ccd-state as well
                return hearingData && hearingData.current_state && hearingData.current_state.state_name === RELISTED_STATE;
            },
            consequence: context => {
                const hearingData = context.caseData.hearingData;
                context.outcome = createCaseState(RELISTED_STATE, hearingData.current_state.state_datetime, '');
                context.stop = true;
            }
        };
    }
};

const CCD_COH_CONDITON = ccdCohStateCondition.init();

const conditions = [
    CCD_COH_CONDITON,
    cohDecisionStateCondition.init(),
    cohRelistStateCondition.init(),
    cohStateCondition.init(),
    deadlineExtensionExpiredCondition.init(),
    deadlineElapsedCondition.init(),
    questionStateCondition.init()
];

const processEngineMap = {
    sscs: {
        benefit: {
            stateConditions: conditions
        }
    },
    cmc: {
        moneyclaimcase: { stateConditions: [CCD_COH_CONDITON] }
    },
    probate: {
        grantofrepresentation: { stateConditions: [CCD_COH_CONDITON] }
    },
    divorce: {
        divorce: { stateConditions: [CCD_COH_CONDITON] },
        financialremedymvp2: { stateConditions: [CCD_COH_CONDITON] }
    }
};

function getProcessEngine(jurisdiction, caseType) {
    const jud = processEngineMap[jurisdiction.toLowerCase()];
    const conditionsList = jud ? jud[caseType.toLowerCase()] : null;
    return (conditionsList) ? conditionsList : [CCD_COH_CONDITON];
}

module.exports = param => {
    const processEngine = getProcessEngine(param.jurisdiction, param.caseType);

    const context = {
        caseData: param,
        stop: false,
        outcome: {}
    };

    processEngine.stateConditions.forEach(condition => {
        if (!context.stop) {
            const result = condition.evaluate(context);
            if (result) {
                condition.consequence(context);
            }
        }
    });

    return context.outcome;
};
