function processEngine(param) {
    const ccdCohStateCondition = {
        init: () => {
            return {
                evaluate: context => {
                    // don't know yet what would CCD state like for COH
                    return true; //context.caseData.ccdState === 'continuous_online_hearing_started'??;
                },
                consequence: context => {
                    context.outcome = {
                        stateName: context.caseData.ccdState,
                        actionGoTo: ''
                    };
                    context.ccdCohStateCheck = true;
                }
            }
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
                    context.outcome = {
                        stateName: state,
                        actionGoTo: ''
                    };
                }
            }
        }
    };

    const cohAnswerStateCondition  = {
        init: (state = 'question_answered') => {
            return {
                evaluate: context => {
                    const caseData = context.caseData;
                    const answerState = '';

                    return context.cohStateCheck && answerState === state;
                },
                consequence: context => {
                    context.outcome = {
                        stateName: state,
                        actionGoTo: ''
                    };
                }
            }
        }
    };

    const cohQuestionStateCondition = {
        init: ( state = 'question_deadline_elapsed') => {
            return {
                evaluate: context => {
                    const caseData = context.caseData;
                    const questionState = '';

                    return context.cohStateCheck && questionState === state;
                },
                consequence: context => {
                    context.outcome = {
                        stateName: state,
                        actionGoTo: ''
                    };


                }
            }
        }
    };

    const cohDecisionStateCondition = {
        init: (state) => {
            return {
                evaluate: context => {
                    const hearingData = context.caseData.hearingData;
                    return /*what_would_ccd_state && */ hearingData && hearingData.current_state && hearingData.current_state.state_name === state;
                },
                consequence: context => {
                    context.outcome = {
                        stateName: state,
                        actionGoTo: ''
                    };

                    context.stop = true;
                }
            }
        }
    };

    const cohRelistStateCondition = {
        init: (state) => {
            return {
                evaluate: context => {
                    const hearingData = context.caseData.hearingData;
                    return /*what_would_ccd_statek && */ hearingData && hearingData.current_state && hearingData.current_state.state_name === state;
                },
                consequence: context => {
                    context.outcome = {
                        stateName: state,
                        actionGoTo: ''
                    };
                    context.stop = true;
                }
            }
        }
    };


    const conditions = [
        ccdCohStateCondition.init(),
        cohDecisionStateCondition.init('continuous_online_hearing_decision_issued'),
        cohRelistStateCondition.init('continuous_online_hearing_relisted'),
        cohStateCondition.init(),
        cohQuestionStateCondition.init(),
        cohAnswerStateCondition.init()
    ];

    const context = {
        caseData: param,
        stop: false,
        outcome: {}
    };

    conditions.forEach(condition => {
        if (!context.stop) {
            const result = condition.evaluate (context);
            if (result) {
                condition.consequence(context);
            }
        }
    });

    return context.outcome;
}
