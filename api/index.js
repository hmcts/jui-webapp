const express = require('express');

const router = express.Router();

const auth = require('./auth');
const caseRoutes = require('./cases');
const decisionRoutes = require('./decisions');
const questions = require('./questions/question');
const events = require('./events/event');
const hearingRoutes = require('./hearings/hearing');
const documents = require('./documents/document');
const authInterceptor = require('./middleware/auth');

const barApiRoutes = require('./services/bar-api/bar-api');
const ccdDefApiRoutes = require('./services/ccd-def-api/ccd-def-api');
const ccdStoreApiRoutes = require('./services/ccd-store-api/ccd-store');
const cohCorApiRoutes = require('./services/coh-cor-api/coh-cor-api');
const dmStoreApiRoutes = require('./services/dm-store-api/dm-store-api');
const draftStoreApiRoutes = require('./services/draft-store-api/draft-store-api');
const emAnnoApiRoutes = require('./services/em-anno-api/em-anno-api');
const emNpaApiRoutes = require('./services/em-npa-api/em-npa-api');
const feeApiRoutes = require('./services/fee-api/fee-api');
const idamApiRoutes = require('./services/idam-api/idam-api');
const payApiRoutes = require('./services/pay-api/pay-api');
const s2sApiRoutes = require('./services/service-auth-provider-api/service-auth-provider');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

auth(router);
router.use(authInterceptor);
questions(router);
events(router);
documents(router);
hearingRoutes(router);
caseRoutes(router);
decisionRoutes(router);
emAnnoApiRoutes(router);
emNpaApiRoutes(router);

// Uncomment to enable direct access to Microservices
// barApiRoutes(router);
// ccdDefApiRoutes(router);
// ccdStoreApiRoutes(router);
// cohCorApiRoutes(router);
// dmStoreApiRoutes(router);
// draftStoreApiRoutes(router);
// emAnnoApiRoutes(router);
// feeApiRoutes(router);
// idamApiRoutes(router);
// payApiRoutes(router);
// s2sApiRoutes(router);

module.exports = router;
