import * as applicationinsights from 'applicationinsights'
import { config } from '../../config'

export let client

// shouldnt do this check here but this is a high level dep
const environment = process.env.JUI_ENV || 'local'

if (environment !== 'local ') {
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

} else {
    client = {}
}
