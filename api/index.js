const express = require('express')

const router = express.Router()

const config = require('../config')

const authInterceptor = require('./lib/middleware/auth')
const serviceTokenMiddleware = require('./lib/middleware/service-token')
const auth = require('./auth')
const caseRoutes = require('./case')
const caseListRoute = require('./case-list')
const decisionRoutes = require('./decisions')
const questionsRoutes = require('./questions')
const eventsRoutes = require('./events')
const hearingRoutes = require('./hearings')
const documentsRoutes = require('./documents')

const caseCreationRoute = require('./case-creation')

const barApiRoutes = require('./services/bar-api/bar-api')
const ccdDefApiRoutes = require('./services/ccd-def-api/ccd-def-api')
const ccdStoreApiRoutes = require('./services/ccd-store-api/ccd-store')
const cohCorApiRoutes = require('./services/coh-cor-api/coh-cor-api')
const dmStoreApiRoutes = require('./services/dm-store-api/dm-store-api')
const draftStoreApiRoutes = require('./services/draft-store-api/draft-store-api')
const emAnnoApiRoutes = require('./services/em-anno-api/em-anno-api')
const emNpaApiRoutes = require('./services/em-npa-api/em-npa-api')
const feeApiRoutes = require('./services/fee-api/fee-api')
const idamApiRoutes = require('./services/idam-api/idam-api')
const payApiRoutes = require('./services/pay-api/pay-api')
const s2sApiRoutes = require('./services/service-auth-provider-api/service-auth-provider-api')


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

router.use(serviceTokenMiddleware)
auth(router)
router.use(authInterceptor)
caseListRoute(router)
caseRoutes(router)
eventsRoutes(router)
documentsRoutes(router)
hearingRoutes(router)
questionsRoutes(router)
decisionRoutes(router)

if (config.configEnv !== 'prod') {
    // Dev Tools
    caseCreationRoute(router)

// Uncomment to enable direct access to Microservices
    barApiRoutes(router)
    ccdDefApiRoutes(router)
    ccdStoreApiRoutes(router)
    cohCorApiRoutes(router)
    dmStoreApiRoutes(router)
    draftStoreApiRoutes(router)

    feeApiRoutes(router)
    idamApiRoutes(router)
    payApiRoutes(router)
    s2sApiRoutes(router)

}

emAnnoApiRoutes(router)
emNpaApiRoutes(router)


module.exports = router
