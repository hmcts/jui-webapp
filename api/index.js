const express = require('express');
const router = express.Router();
const auth = require('./auth');
const caseRoutes = require('./cases');
const decisionRoutes = require('./decisions');
const questions = require('./questions');
const events = require('./events');
const hearingRoutes = require('./hearings');
const documents = require('./documents');
const annotations = require('./annotations');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const authInterceptor = require('./middleware/auth'); 

auth(router);
router.use(authInterceptor);
questions(router);
events(router);
documents(router);
hearingRoutes(router);
caseRoutes(router);
decisionRoutes(router);

router.use('/annotation-sets', annotations);
module.exports = router;
