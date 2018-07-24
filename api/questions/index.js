const questionsRoute = require('./question');
const { postHearing, getQuestionsByCase, getAllQuestionsByCase } = require('./question');

module.exports = (app) => questionsRoute(app);
module.exports.postHearing = postHearing;
module.exports.getQuestionsByCase = getQuestionsByCase;
module.exports.getAllQuestionsByCase = getAllQuestionsByCase;
