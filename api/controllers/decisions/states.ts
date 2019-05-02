import * as express from 'express'
import { process } from '../../lib/stateEngine'
import { Store } from '../../lib/store/store'
import * as coh from '../../services/coh'
import * as divorce from './divorce'
import * as sscs from './sscs'

const divorceType = 'DIVORCE'
const sscsType = 'SSCS'

export async function handleStateRoute(req, res) {
    const jurisdiction = req.params.jurId
    const caseTypeId = req.params.caseTypeId.toLowerCase()

    switch (jurisdiction) {
        case divorceType:
            process(req, res, divorce.mapping[caseTypeId], divorce.payload[caseTypeId], divorce.templates, new Store(req))
            break
        case sscsType:
            const hearingId = await sscs.init(req, res)
            process(req, res, sscs.mapping, sscs.payload, sscs.templates, new coh.Store(hearingId))
            break
        default:
    }
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
    router.post('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
}
