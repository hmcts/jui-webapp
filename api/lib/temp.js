const noFurtherAction = (hearing) => {
    return hearing.current_state;
};

const caseState = {
    evaluate(stateName, hearing) {
        const action = this.states[stateName];
        if (action) {
            action.apply(hearing);
        }
        return hearing.current_state;
    },
    states: {
        continuous_online_hearing_started: function (hearing) {
            const todos = ['question_answered', 'question_deadline_elapsed'];
            todos.forEach(todo => {
                const result = this.evaluate(todo, hearing);
                if (result) {
                    return result;
                }
            });

            return hearig.current_state;
        },
        continuous_online_hearing_decision_issued: function(hearing) {
            return noFurtherAction(hearing);
        },
        continuous_online_hearing_relisted: function (hearing) {
            return noFurtherAction(hearing);
        },
        question_answered: function (hearing) {
            // work out question_answered status sutff and return
            // question.current_question_state
        },
        question_deadline_elapsed: function (hearing) {
            // work out whether deadline extension has expired
            // or just question deadline expired.
        }

    }
};

module.exports = (hearing) => caseState.evaluate(hearing.current_state.state_name, hearing);
