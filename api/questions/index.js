const questionsRoute = require('./question');
const { postHearing, getAllQuestionsByCase } = require('./question');

module.exports = app => questionsRoute(app);

module.exports.postHearing = postHearing;

module.exports.getAllQuestionsByCase = getAllQuestionsByCase;
