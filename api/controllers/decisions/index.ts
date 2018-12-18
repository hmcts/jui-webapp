import cohDecisionsRoutes from './cohDecisions'
import states from './states'

export default app => {
    cohDecisionsRoutes(app)
    states(app)
}
