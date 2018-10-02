const { CONSTANTS } = require('./case-state-util');
const { createCaseState } = require('./case-state-util');

const CCD_STATE = {
    when: function(context) {
        // don't know yet what would CCD state like for COH
        // context.caseData.ccdState === 'continuous_online_hearing_started'??;
        // TODO add check for ccd-state
        return true;
    },
    then: function(context) {
        context.outcome = createCaseState(context.caseData.ccdState, null, '');
        context.ccdCohStateCheck = true;
    }
};

const cohState = {
    when: function(context) {
        const hearingData = context.caseData.hearingData;
        const hearingState = (hearingData) ? hearingData.current_state.state_name : undefined;
        return context.ccdCohStateCheck && hearingState && hearingState === CONSTANTS.COH_STATE;
    },
    then: function(context) {
        context.cohStateCheck = true;
        const hearingData = context.caseData.hearingData;
        context.outcome = createCaseState(CONSTANTS.COH_STATE, hearingData.current_state.state_datetime, '');
    }
};

const questionState = {
    when: function(context) {
        const questionRound = context.caseData.questionRoundData;
        const currentState = questionRound && questionRound.questions && questionRound.questions[0].state;

        return context.cohStateCheck && currentState;
    },
    then: function(context) {
        const questionRound = context.caseData.questionRoundData;
        context.outcome = createCaseState(questionRound.questions[0].state, questionRound.questions[0].state_datetime, 'questions');
    }

};

const deadlineElapsed = {
    when: function(context) {
        const questionRound = context.caseData.questionRoundData;
        return context.cohStateCheck && questionRound && questionRound.state === CONSTANTS.Q_DEADLINE_ELAPSED_STATE;
    },
    then: function(context) {
        const questionRound = context.caseData.questionRoundData;
        context.outcome = createCaseState(CONSTANTS.Q_DEADLINE_ELAPSED_STATE, questionRound.questions[0].state_datetime, 'questions');
    }
};

const deadlineExtensionExpired = {
    when: function(context) {
        const questionRound = context.caseData.questionRoundData;
        const questionDeadlineElapsed = context.cohStateCheck && questionRound && questionRound.state === CONSTANTS.Q_DEADLINE_ELAPSED_STATE;
        return questionDeadlineElapsed && questionRound.deadline_extension_count > 0;
    },
    then: function(context) {
        const questionRound = context.caseData.questionRoundData;
        context.outcome = createCaseState(CONSTANTS.Q_DEADLINE_EXT_ELAPSED_STATE, questionRound.questions[0].state_datetime, CONSTANTS.QUESTIONS_GO_TO);
        context.stop = true;
    }
};

const cohDecisionState = {
    when: function(context) {
        const hearingData = context.caseData.hearingData;
        // TODO add check for ccd-state as well
        return hearingData && hearingData.current_state && hearingData.current_state.state_name === CONSTANTS.DECISION_ISSUED_STATE;
    },
    then: function(context) {
        const hearingData = context.caseData.hearingData;
        context.outcome = createCaseState(CONSTANTS.DECISION_ISSUED_STATE, hearingData.current_state.state_datetime, '');

        context.stop = true;
    }
};

const cohRelistState = {
    when: function(context) {
        const hearingData = context.caseData.hearingData;
        // TODO add check for ccd-state as well
        return hearingData && hearingData.current_state && hearingData.current_state.state_name === CONSTANTS.RELISTED_STATE;
    },
    then: function (context) {
        const hearingData = context.caseData.hearingData;
        context.outcome = createCaseState(CONSTANTS.RELISTED_STATE, hearingData.current_state.state_datetime, '');
        context.stop = true;
    }
};

const referredToJudge = {
    when: function(context) {
        return context.caseData.ccdState === CONSTANTS.REFER_TO_JUDGE;
    },
    then: function (context) {
        context.outcome = createCaseState(context.caseData.ccdState, null, CONSTANTS.CASE_FILE_GO_TO);
    }
};

const processEngineMap = {
    sscs: {
        benefit: {
            stateConditions: [
                CCD_STATE, cohDecisionState,
                cohRelistState, cohState,
                deadlineExtensionExpired, deadlineElapsed, questionState
            ]
        }
    },
    cmc: {
        moneyclaimcase: { stateConditions: [CCD_STATE] }
    },
    probate: {
        grantofrepresentation: { stateConditions: [CCD_STATE] }
    },
    divorce: {
        divorce: { stateConditions: [CCD_STATE] },
        financialremedymvp2: { stateConditions: [CCD_STATE, referredToJudge] }
    }
};

function getProcessEngine(jurisdiction, caseType) {
    const jud = processEngineMap[jurisdiction.toLowerCase()];
    const conditionsList = jud ? jud[caseType.toLowerCase()] : null;
    return (conditionsList) ? conditionsList : [CCD_STATE];
}

const conditionProcessor = {
    init: context => {
        return {
            evaluate: when => when(context),
            consequence: then => then(context)
        };
    }
};

module.exports = param => {
    const stateConditions = getProcessEngine(param.jurisdiction, param.caseType).stateConditions;

    const context = {
        caseData: param,
        stop: false,
        outcome: {}
    };

    const processor = conditionProcessor.init(context);
    stateConditions.forEach(condition => {
        if (!context.stop) {
            const result = processor.evaluate(condition.when);
            if (result) {
                processor.consequence(condition.then);
            }
        }
    });

    return context.outcome;
};
