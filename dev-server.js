const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');
const express = require('express');
const apiRoute = require('./api');
const serviceTokenMiddleware = require('./middleware/service-token');
const config = require('./config');
const app = express();

app.get("/health", healthcheck.configure({
    checks: {
        'dm_store_api' : healthcheck.web(`${config.services.dm_store_api}/health`),
        // 'em_anno_api' : healthcheck.web(`${config.services.em_anno_api}/health`),
        // 'em_redact_api' : healthcheck.web(`${config.services.em_redact_api}/health`),
        // 'ccd_data_api' : healthcheck.web(`${config.services.ccd_data_api}/health`),
        // 'idam' : healthcheck.web(`${config.services.idam}/health`),
        's2s' : healthcheck.web(`${config.services.s2s}/health`)
    },
    buildInfo: {

    }
}));

app.get('/info', infoRequestHandler({
    info: {
        'dm_store_api' : new InfoContributor(`${config.services.dm_store_api}/info`),
        // 'em_anno_api' : new InfoContributor(`${config.services.em_anno_api}/info`),
        // 'em_redact_api' : new InfoContributor(`${config.services.em_redact_api}/info`),
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


app.listen(3001, () => console.log('Example app listening on port 3001!'));
