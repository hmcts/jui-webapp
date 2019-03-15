import ccdDecisionsRoutes from './ccdDecisions'
import cohDecisionsRoutes from './cohDecisions'

import states from './states'

export default app => {
    cohDecisionsRoutes(app)
    ccdDecisionsRoutes(app)
    states(app)
}
