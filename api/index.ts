import * as express from 'express'
import * as config from '../config'
import { auth } from './controllers/auth'
import caseRoutes from './controllers/case'
import decisionRoutes from './controllers/decisions'
import { errorStack } from './lib/errorStack'
import serviceTokenMiddleware from './lib/middleware/service-token'
import barApiRoutes from './services/bar'
import ccdStoreApiRoutes from './services/ccd-store-api/ccd-store'
import ccdDefApiRoutes from './services/ccdDef'
import cohCorApiRoutes from './services/cohQA'
import dmStoreApiRoutes from './services/DMStore'
import idamApiRoutes from './services/idam'
import s2sApiRoutes from './services/serviceAuth'

const router = express.Router()

const authInterceptor = require('./lib/middleware/auth')

const caseListRoute = require('./controllers/case-list')

const questionsRoutes = require('./controllers/questions')
const eventsRoutes = require('./controllers/events')

const documentsRoutes = require('./controllers/documents')
const caseCreationRoute = require('./controllers/case-creation')

const emAnnoApiRoutes = require('./services/em-anno-api/em-anno-api')
const emNpaApiRoutes = require('./services/em-npa-api/em-npa-api')

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
    idamApiRoutes(router)
    s2sApiRoutes(router)
}

emAnnoApiRoutes(router)
emNpaApiRoutes(router)

module.exports = router
