const express = require('express');
const router = express.Router();
const caseRoutes = require('./cases');
const documentRoutes = require('./documents');
const auth = require('./auth');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const authInterceptor = require('./middleware/auth');

router.use('/oauth2/callback', auth);

router.use(authInterceptor);

router.use('/cases', caseRoutes);

router.use('/documents', documentRoutes);

module.exports = router;
