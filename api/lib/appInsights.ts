import * as applicationinsights from 'applicationinsights'
import * as express from 'express'
import { config } from '../../test-config'

export let client

// shouldnt do this check here but this is a high level dep
const environment = process.env.JUI_ENV || 'local'

if (environment !== 'local' && environment !== 'prod') {
    applicationinsights
        .setup(config.appInsightsInstrumentationKey)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setUseDiskRetryCaching(true)
        .start()

    client = applicationinsights.defaultClient
    client.trackTrace({ message: 'App Insight Activated' })

} else {
    client = null
}

export function appInsights(req: express.Request, res: express.Response, next: express.next) {
    if (client) {
        client.trackNodeHttpRequest({ request: req, response: res })
    }

    next()
}
