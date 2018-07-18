const questionsRoute = require('./question');
const { postHearing, getQuestionsByCase } = require('./question');

module.exports = (app) => questionsRoute(app);
module.exports.postHearing = postHearing;
module.exports.getQuestionsByCase = getQuestionsByCase;
