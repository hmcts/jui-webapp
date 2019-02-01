import * as applicationinsights from 'applicationinsights'
import { config } from '../../config'


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

export const client = applicationinsights.defaultClient
