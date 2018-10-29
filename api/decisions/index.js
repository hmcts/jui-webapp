const cohDecisionsRoutes = require('./cohDecisions')
const stateDecisionCallback = require('./state')

module.exports = app => {
    cohDecisionsRoutes(app)
    stateDecisionCallback(app)
}
