const ccdCohStateCondition = {
    init: () => {
        return {
            evaluate: context =>
                // don't know yet what would CCD state like for COH
                // context.caseData.ccdState === 'continuous_online_hearing_started'??;
                // TODO add check for ccd-state
                true,
            consequence: context => {
                context.outcome = {
                    stateName: context.caseData.ccdState,
                    actionGoTo: ''
                };
                context.ccdCohStateCheck = true;
            }
        };
    }
};

const cohStateCondition = {
    init: (state = 'continuous_online_hearing_started') => {
        return {
            evaluate: context => {
                const hearingData = context.caseData.hearingData;
                const hearingState = (hearingData) ? hearingData.current_state.state_name : undefined;
                return context.ccdCohStateCheck && hearingState && hearingState === state;
            },
            consequence: context => {
                context.cohStateCheck = true;
                const hearingData = context.caseData.hearingData;
                context.outcome = {
                    stateName: state,
                    stateDateTime: hearingData.current_state.state_datetime,
                    actionGoTo: ''
                };
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

                context.outcome = {
                    stateName: questionRound.questions[0].state,
                    stateDateTime: questionRound.questions[0].state_datetime,
                    actionGoTo: ''
                };
            }
        };
    }
};

const deadlineElapsedCondition = {
    init: (state = 'question_deadline_elapsed') => {
        return {
            evaluate: context => {
                const questionRound = context.caseData.questionRoundData;
                return context.cohStateCheck && questionRound && questionRound.state === state;
            },
            consequence: context => {
                const questionRound = context.caseData.questionRoundData;
                context.outcome = {
                    stateName: state,
                    stateDateTime: questionRound.questions[0].state_datetime,
                    actionGoTo: ''
                };
            }
        };
    }
};

const deadlineExtensionExpiredCondition = {
    init: (state = 'question_deadline_elapsed') => {
        return {
            evaluate: context => {
                const questionRound = context.caseData.questionRoundData;
                const questionDeadlineElapsed = context.cohStateCheck && questionRound && questionRound.state === state;
                return questionDeadlineElapsed && questionRound.deadline_extension_count > 0;
            },
            consequence: context => {
                const questionRound = context.caseData.questionRoundData;
                context.outcome = {
                    stateName: 'question_deadline_extension_elapsed',
                    stateDateTime: questionRound.questions[0].state_datetime,
                    actionGoTo: ''
                };
            }
        };
    }
};

const cohDecisionStateCondition = {
    init: (state = 'continuous_online_hearing_decision_issued') => {
        return {
            evaluate: context => {
                const hearingData = context.caseData.hearingData;
                // TODO add check for ccd-state as well
                return hearingData && hearingData.current_state && hearingData.current_state.state_name === state;
            },
            consequence: context => {
                context.outcome = {
                    stateName: state,
                    actionGoTo: ''
                };

                context.stop = true;
            }
        };
    }
};

const cohRelistStateCondition = {
    init: (state = 'continuous_online_hearing_relisted') => {
        return {
            evaluate: context => {
                const hearingData = context.caseData.hearingData;
                // TODO add check for ccd-state as well
                return hearingData && hearingData.current_state && hearingData.current_state.state_name === state;
            },
            consequence: context => {
                context.outcome = {
                    stateName: state,
                    actionGoTo: ''
                };
                context.stop = true;
            }
        };
    }
};


const conditions = [
    ccdCohStateCondition.init(),
    cohDecisionStateCondition.init(),
    cohRelistStateCondition.init(),
    cohStateCondition.init(),
    deadlineExtensionExpiredCondition.init(),
    deadlineElapsedCondition.init(),
    questionStateCondition.init()
];


module.exports = param => {
    const context = {
        caseData: param,
        stop: false,
        outcome: {}
    };

    conditions.forEach(condition => {
        if (!context.stop) {
            const result = condition.evaluate(context);
            if (result) {
                condition.consequence(context);
            }
        }
    });

    return context.outcome;
};
