const getRounds = require('../questions');
const moment = require('moment');

function stateDatetimeDiff(question1, question2) {
    const question1StateDateTime = moment.utc(question1.current_question_state.state_datetime);
    const question2StateDateTime = moment.utc(question2.current_question_state.state_datetime);

    return moment.duration(moment(question2StateDateTime).diff(moment(question1StateDateTime))).asMilliseconds();
}

function sortByStateDateTime(questionReferences) {
    return questionReferences.sort((question1, question2) => stateDatetimeDiff(question1, question2));
}

function latestQuestionRounds(questionRounds) {
    if (questionRounds) {
        return questionRounds.question_rounds
            .find(round => round.question_round_number === questionRounds.current_question_round);
    }
    return {};
}

function latestQuestionRound(hearing, options) {
    return getRounds(hearing.online_hearing_id, options).then(latestQuestionRounds);
}

function roundWithDeadlineExtensionElapsed(questionRound) {
    return questionRound && questionRound.deadline_extension_count > 0
        && questionRound.question_round_state.state_name === 'question_deadline_elapsed';
}

function caseState(questionsRound) {
    const question = sortByStateDateTime(questionsRound.question_references)
        .find(questionReference => questionReference.current_question_state.state_name === 'question_answered');

    return {
        state_datetime: question.current_question_state.state_datetime,
        state_name: 'question_deadline_extension_elapsed'
    };
}

function getRoundState(hearing, options) {
    const questionRound = latestQuestionRound(hearing, options);
    return roundWithDeadlineExtensionElapsed(questionRound) ? caseState(questionRound) : {};
}

module.exports = (hearing, options) => {
    return getRoundState(hearing, options);
};
