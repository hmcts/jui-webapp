const express = require('express');
const router = express.Router();
const auth = require('./auth');
const caseRoutes = require('./cases');
const decisionRoutes = require('./decisions');
const questions = require('./questions');
const events = require('./events');
const hearingRoutes = require('./hearings');
const documents = require('./documents');
const authInterceptor = require('./middleware/auth');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

auth(router);
router.use(authInterceptor);
questions(router);
events(router);
documents(router);
hearingRoutes(router);
caseRoutes(router);
decisionRoutes(router);

module.exports = router;
