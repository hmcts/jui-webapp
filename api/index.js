const express = require('express');
const router = express.Router();
const caseRoutes = require('./cases');
const documentRoutes = require('./documents');
const questionRoutes = require('./questions');
const auth = require('./auth');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const authInterceptor = require('./middleware/auth');

auth(router);

router.use(authInterceptor);

router.use('/cases', caseRoutes);

router.use('/documents', documentRoutes);

router.use('/questions', questionRoutes);

module.exports = router;
