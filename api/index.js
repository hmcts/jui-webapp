const express = require('express');
const router = express.Router();
const caseRoutes = require('./cases');
const documentRoutes = require('./documents');
const questionRoutes = require('./questions');
const decisionRoutes = require('./decisions');
const auth = require('./auth');
const events = require('./events');
const documents = require('./documents');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const authInterceptor = require('./middleware/auth');

auth(router);

router.use(authInterceptor);

events(router);
documents(router);
router.use('/cases', caseRoutes);
// router.use('/documents', documents);
// router.use('/events', eventRoutes);

router.use('/questions', questionRoutes);
router.use('/decisions', decisionRoutes);

module.exports = router;
