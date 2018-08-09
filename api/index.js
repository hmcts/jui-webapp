const express = require('express');

const router = express.Router();
const caseRoutes = require('./cases');
const decisionRoutes = require('./decisions');
const auth = require('./auth');
const questions = require('./questions');
const events = require('./events');
const documents = require('./documents');
const annotations = require('./annotations');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const authInterceptor = require('./middleware/auth');

auth(router);

router.use(authInterceptor);

questions(router);
events(router);
documents(router);


router.use('/cases', caseRoutes);
router.use('/decisions', decisionRoutes);
router.use('/annotation-sets', annotations);

module.exports = router;
