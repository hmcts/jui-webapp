import * as express from 'express'
import * as config from '../config'
import { auth } from './controllers/auth'
import caseRoutes from './controllers/case'
import decisionRoutes from './controllers/decisions'
import { errorStack } from './lib/errorStack'
import ccdStoreApiRoutes from './services/ccd-store-api/ccd-store'
import cohCorApiRoutes from './services/coh-cor-api/coh-cor-api'
import dmStoreApiRoutes from './services/DMStore'
//import idamApiRoutes from './services/idam-api/idam-api'

const router = express.Router()

const idamApiRoutes = require('./services/idam-api/idam-api')

const authInterceptor = require('./lib/middleware/auth')
const serviceTokenMiddleware = require('./lib/middleware/service-token')
const caseListRoute = require('./controllers/case-list')

const questionsRoutes = require('./controllers/questions')
const eventsRoutes = require('./controllers/events')

const documentsRoutes = require('./controllers/documents')
const caseCreationRoute = require('./controllers/case-creation')

const barApiRoutes = require('./services/bar-api/bar-api')
const ccdDefApiRoutes = require('./services/ccd-def-api/ccd-def-api')

const draftStoreApiRoutes = require('./services/draft-store-api/draft-store-api')
const emAnnoApiRoutes = require('./services/em-anno-api/em-anno-api')
const emNpaApiRoutes = require('./services/em-npa-api/em-npa-api')
const feeApiRoutes = require('./services/fee-api/fee-api')

const payApiRoutes = require('./services/pay-api/pay-api')
const s2sApiRoutes = require('./services/service-auth-provider-api/service-auth-provider-api')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

router.use(serviceTokenMiddleware)
auth(router)
router.use(authInterceptor)

router.use(errorStack)

caseListRoute(router)
decisionRoutes(router)
documentsRoutes(router)
caseRoutes(router)
eventsRoutes(router)
questionsRoutes(router)

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
