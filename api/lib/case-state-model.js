const moment = require('moment');

// const caseState = {
//     dispatch(hearing) {
//         const action = this.actions[this.currentAction]['checkStatus'];
//
//         if (action) {
//             action.apply(hearing);
//         }
//     },
//     changeActionTo(newAction) {
//         this.currentAction = newAction;
//     },
//     currentAction: 'coh',
//     actions: {
//         coh: {
//             checkStatus: function(hearing) {
//               return this[hearing.current_state.state_name].apply(hearing);
//             },
//             continuous_online_hearing_started: function (hearing) {
//                 if (hearing.questions) {
//                     this.changeActionTo('questions');
//                     return this.dispatch(hearing);
//                 } else {
//                     return hearing.current_state;
//                 }
//             },
//             continuous_online_hearing_decision_issued: function (hearing) {
//                 return hearing.current_state;
//             },
//             continuous_online_hearing_relisted: function (hearing) {
//                 return hearing.current_state;
//             }
//         },
//         questions: {
//             checkStatus: function(hearing) {
//                 // find question with issued status
//             },
//             question_issued: function(hearing) {
//
//             },
//             question_deadline_elapsed: function (hearing) {
//             }
//         }
//     }
// };
//
// module.exports = hearing => caseState.dispatch(hearing);

function questionStateDatetimeDiff(question1, question2) {
    const question1StateDateTime = moment.utc(question1.current_question_state.state_datetime);
    const question2StateDateTime = moment.utc(question2.current_question_state.state_datetime);

    return moment.duration(moment(question2StateDateTime).diff(moment(question1StateDateTime))).asMilliseconds();
}

function recentUpdatedQuestion(questionReferences) {
    return questionReferences.sort((question1, question2) => questionStateDatetimeDiff(question1, question2));
}

function questionRoundExists(hearing) {
    return hearing.questions;
}

function answerStateDatetimeDiff(answer1, answer2) {
    const answer1StateDateTime = moment.utc(answer1.current_answer_state.state_datetime);
    const answer2StateDateTime = moment.utc(answer2.current_answer_state.state_datetime);

    return moment.duration(moment(answer2StateDateTime).diff(moment(answer1StateDateTime))).asMilliseconds();
}

function latestAnswer(answers) {
    return answers.sort((answer1, answer2) => answerStateDatetimeDiff(answer1, answer2));
}

function questionStatus(hearing) {
    const latestQuestion = recentUpdatedQuestion(hearing.questions);

    const questionAnswered = latestQuestion
        .find(questionReference => questionReference.current_question_state.state_name === 'question_answered');

    if (questionAnswered) {
        const foundAnswer = latestAnswer(questionAnswered.answers)
            .find(answer => answer.current_answer_state.state_name === 'answer_submitted');
        return foundAnswer.current_answer_state;
    }

    const questionDeadlineElapsed = latestQuestion
        .find(questionReference => questionReference.current_question_state.state_name === 'question_deadline_elapsed');

    if (questionDeadlineElapsed) {
        if (questionDeadlineElapsed.deadline_extension_count > 0) {
            return {
                state_name: 'question_deadline_extension_elapsed',
                state_datetime: latestQuestion.current_question_state.state_datetime
            };
        } else {
            return questionDeadlineElapsed.current_question_state;
        }
    }

    const questionIssued = latestQuestion.find()
        .find(questionReference => questionReference.current_question_state.state_name === 'question_issued');
    if (questionIssued) {
        return questionIssued.current_question_state;
    }

    return hearing.current_state;
}

const state = {
    generate(hearing) {

        if (hearing.current_state.state_name === 'continuous_online_hearing_started' && questionRoundExists(hearing)) {
            return questionStatus(hearing);
        }

        return hearing.current_state;
    }
};
