const { getRounds } = require('../questions');
const moment = require('moment');

const EMPTY = {};

function stateDatetimeDiff(question1, question2) {
    const question1StateDateTime = moment.utc(question1.current_question_state.state_datetime);
    const question2StateDateTime = moment.utc(question2.current_question_state.state_datetime);

    return moment.duration(moment(question2StateDateTime).diff(moment(question1StateDateTime))).asMilliseconds();
}

function sortByStateDateTime(questionReferences) {
    return questionReferences.sort((question1, question2) => stateDatetimeDiff(question1, question2));
}

function questionRoundsExist(questionRounds) {
    return questionRounds !== undefined
        && questionRounds !== null
        && questionRounds.question_rounds !== undefined
        && questionRounds.question_rounds !== null
        && questionRounds.question_rounds.length > 0;
}

function latestQuestionRounds(questionRounds) {
    if (questionRoundsExist(questionRounds)) {
        return questionRounds.question_rounds
            .find(round => parseInt(round.question_round_number) === questionRounds.current_question_round);
    }
    return EMPTY;
}

function questionRoundExists(questionRound) {
    return questionRound !== EMPTY;
}

function roundWithDeadlineExtensionElapsed(questionRound) {
    return questionRoundExists(questionRound) && questionRound.deadline_extension_count > 0
        && questionRound.question_round_state.state_name === 'question_deadline_elapsed';
}

function caseState(questionRounds) {
    const question = sortByStateDateTime(questionRounds.question_references)
        .find(questionReference => questionReference.current_question_state.state_name === 'question_answered');

    const stateName = roundWithDeadlineExtensionElapsed(questionRounds) ? 'question_deadline_extension_elapsed' : question.current_question_state.state_name;
    return {
        state_datetime: question.current_question_state.state_datetime,
        state_name: stateName
    };
}


function getQuestionRoundState(hearing, options) {
    return getRounds(hearing.online_hearing_id, options)
        .then(latestQuestionRounds)
        .then(questionRound => {
            return questionRoundExists(questionRound) ? caseState(questionRound) : hearing.current_state;
        }).catch(error => {
            console.log('getQuestionRoundState error-->', error);
            return hearing.current_state;
        });
}

module.exports.getQuestionRoundState = getQuestionRoundState;
