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


const emAnnotationRoutes = require('./services/em-anno-api');
const ccdDefintionRoutes = require('./services/ccd-def-api');
const draftStoreRoutes = require('./services/draft-store-api');
const dmStoreRoutes = require('./services/dm-store-api');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

auth(router);
router.use(authInterceptor);
questions(router);
events(router);
documents(router);
hearingRoutes(router);
caseRoutes(router);
decisionRoutes(router);


// Uncomment to enable direct access to Microservices
// emAnnotationRoutes(router);
// ccdDefintionRoutes(router);
// draftStoreRoutes(router);
// dmStoreRoutes(router);

module.exports = router;
