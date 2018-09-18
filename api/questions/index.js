const questionsRoute = require('./question');
const { postHearing, getAllQuestionsByCase, getRounds } = require('./question');

module.exports = app => questionsRoute(app);

module.exports.postHearing = postHearing;

module.exports.getAllQuestionsByCase = getAllQuestionsByCase;

module.exports.getRounds = getRounds;
