const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');
const express = require('express');
const apiRoute = require('./api');
const serviceTokenMiddleware = require('./api/middleware/service-token');
const config = require('./config');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.get('/oauth2/callback', apiRoute);

app.get("/health", healthcheck.configure({
    checks: {

    },
    buildInfo: {

    }
}));

app.get('/info', infoRequestHandler({
    info: {
        'dm_store_api' : new InfoContributor(`${config.services.dm_store_api}/info`),
        // 'em_anno_api' : new InfoContributor(`${config.services.em_anno_api}/info`),
        // 'em_redact_api' : new InfoContributor(`${config.services.em_redact_api}/info`),
        // 'coh_cor_api' : new InfoContributor(`${config.services.coh_cor_api}/info`),
        // 'ccd_data_api' : new InfoContributor(`${config.services.ccd_data_api}/info`),
        // 'idam' : new InfoContributor(`${config.services.idam}/info`),
        's2s' : new InfoContributor(`${config.services.s2s}/info`)
    },
    extraBuildInfo: {
        // featureToggles: config.get('featureToggles'),
        // hostname: hostname()
    }
}));

app.use(serviceTokenMiddleware);
app.use('/api', apiRoute);


module.exports = app;