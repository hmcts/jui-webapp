import * as express from 'express'
import * as config from '../config'
import {auth} from './controllers/auth'

const router = express.Router()

import decisionRoutes from './controllers/decisions'

const authInterceptor = require('./lib/middleware/auth')
const serviceTokenMiddleware = require('./lib/middleware/service-token')
const caseRoutes = require('./controllers/case')
const caseListRoute = require('./controllers/case-list')

const questionsRoutes = require('./controllers/questions')
const eventsRoutes = require('./controllers/events')
const documentsRoutes = require('./controllers/documents')

const caseCreationRoute = require('./controllers/case-creation')

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
