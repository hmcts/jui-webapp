const getRounds = require('../questions');

function questionDeadlineExtensionElapsed(questionRound) {
    return questionRound.deadline_extension_count > 0
        && questionRound.question_round_state.state_name === 'question_deadline_elapsed';
}
function latestQuestionRounds(questionRounds) {
    return questionRounds.question_rounds
        .find(round => round.question_round_number === questionRounds.current_question_round);
}

function getHearingRound(hearing, options) {
    return getRounds(hearing.online_hearing_id, options).then(latestQuestionRounds);
}

function getQuestionRoundState(hearing, options) {
    const questionRound = getHearingRound(hearing, options);
    return questionDeadlineExtensionElapsed(questionRound) ? { state_name: 'question_deadline_extension_elapsed' } : {};
}

function getCaseQuestionState(jurisdiction, caseTypeId, hearing, options) {
    const questionRoundState = getQuestionRoundState(hearing, options);
    return questionRoundState ? questionRoundState : hearing.current_state;
}

module.exports.getCaseQuestionState = getCaseQuestionState;
