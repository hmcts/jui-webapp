const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler } = require('@hmcts/info-provider');
const express = require('express');
const apiRoute = require('./api');
const config = require('./config');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const appInsights = require('applicationinsights');

const session = require('express-session');
const sessionFileStore = require('session-file-store');

const FileStore = sessionFileStore(session);

const appInsightsInstrumentationKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'AAAAAAAAAAAAAAAA';

app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 31536000,
            secure: config.secureCookie !== false
        },
        name: 'jui-webapp',
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        store: new FileStore({ path: process.env.NOW ? '/tmp/sessions' : '.sessions' })
    })
);

appInsights
    .setup(appInsightsInstrumentationKey)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .start();

const client = appInsights.defaultClient;
client.trackTrace({ message: 'Test Message App Insight Activated' });

app.use((req, res, next) => {
    client.trackNodeHttpRequest({ request: req, response: res });
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(
    '/health',
    healthcheck.configure({
        checks: {
            ccd_data_api: healthcheck.web(`${config.services.ccd_data_api}/health`),
            ccd_def_api: healthcheck.web(`${config.services.ccd_def_api}/health`),
            idam_web: healthcheck.web(`${config.services.idam_web}/health`),
            idam_api: healthcheck.web(`${config.services.idam_api}/health`),
            s2s: healthcheck.web(`${config.services.s2s}/health`),
            draft_store_api: healthcheck.web(`${config.services.draft_store_api}/health`),
            dm_store_api: healthcheck.web(`${config.services.dm_store_api}/health`),
            em_anno_api: healthcheck.web(`${config.services.em_anno_api}/health`),
            em_npa_api: healthcheck.web(`${config.services.em_npa_api}/health`),
            coh_cor_api: healthcheck.web(`${config.services.coh_cor_api}/health`)
        },
        buildInfo: {}
    })
);

app.get(
    '/info',
    infoRequestHandler({
        info: {
            ccd_data_api: new InfoContributor(`${config.services.dm_store_api}/info`),
            ccd_def_api: new InfoContributor(`${config.services.ccd_def_api}/info`),
            idam_web: new InfoContributor(`${config.services.idam_web}/info`),
            idam_api: new InfoContributor(`${config.services.idam_api}/info`),
            s2s: new InfoContributor(`${config.services.s2s}/info`),
            draft_store_api: new InfoContributor(`${config.services.draft_store_api}/info`),
            dm_store_api: new InfoContributor(`${config.services.dm_store_api}/info`),
            em_anno_api: new InfoContributor(`${config.services.em_anno_api}/info`),
            em_npa_api: new InfoContributor(`${config.services.em_npa_api}/info`),
            coh_cor_api: new InfoContributor(`${config.services.coh_cor_api}/info`)
        },
        extraBuildInfo: {
            // featureToggles: config.get('featureToggles'),
            // hostname: hostname()
        }
    })
);

app.get('/oauth2/callback', apiRoute);
app.get('/logout', apiRoute);
app.use('/api', apiRoute);

module.exports = app;
