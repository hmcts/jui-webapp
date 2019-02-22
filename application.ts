/*const healthcheck = require('@hmcts/nodejs-healthcheck');*/
/*const { InfoContributor, infoRequestHandler } = require('@hmcts/info-provider');*/

import * as express from 'express';
import { config } from './config';
import { appInsights } from './api/lib/appInsights';
import { securityHeaders } from './api/lib/middleware';
import * as log4jui from './api/lib/log4jui';

const apiRoute = require('./api');
config.environment = process.env.JUI_ENV || 'local';

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const sessionFileStore = require('session-file-store');

const FileStore = sessionFileStore(session);

securityHeaders(app);

app.set('trust proxy', 1);

app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 1800000,
            secure: config.secureCookie !== false
        },
        name: 'jui-webapp',
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        store: new FileStore({
            path: process.env.NOW ? '/tmp/sessions' : '.sessions'
        })
    })
);

app.use(appInsights);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/*function healthcheckConfig(msUrl) {
    return healthcheck.web(`${msUrl}/health`, {
        timeout: 6000,
        deadline: 6000
    })
}

app.get(
    '/health',
    healthcheck.configure({
        checks: {
            //ccd_data_api: healthcheckConfig(config.services.ccd_data_api),
            // ccd_def_api: healthcheckConfig(config.services.ccd_def_api),
            // idam_web: healthcheckConfig(config.services.idam_web),
            //idam_api: healthcheckConfig(config.services.idam_api),
            //s2s: healthcheckConfig(config.services.s2s),
            //draft_store_api: healthcheckConfig(config.services.draft_store_api),
            //dm_store_api: healthcheckConfig(config.services.dm_store_api),
            //em_anno_api: healthcheckConfig(config.services.em_anno_api),
            //em_npa_api: healthcheckConfig(config.services.em_npa_api),
            //coh_cor_api: healthcheckConfig(config.services.coh_cor_api)
        },
        buildInfo: {}
    })
);*/

/*function infocheckConfig(msUrl) {
    return new InfoContributor(`${msUrl}/info`);
}

app.get(
    '/info',
    infoRequestHandler({
        info: {
            ccd_data_api: infocheckConfig(config.services.dm_store_api),
            ccd_def_api: infocheckConfig(config.services.ccd_def_api),
            idam_web: infocheckConfig(config.services.idam_web),
            idam_api: infocheckConfig(config.services.idam_api),
            s2s: infocheckConfig(config.services.s2s),
            draft_store_api: infocheckConfig(config.services.draft_store_api),
            dm_store_api: infocheckConfig(config.services.dm_store_api),
            em_anno_api: infocheckConfig(config.services.em_anno_api),
            em_npa_api: infocheckConfig(config.services.em_npa_api),
            coh_cor_api: infocheckConfig(config.services.coh_cor_api)
        },
        extraBuildInfo: {
            empty: {}
            // featureToggles: config.get('featureToggles'),
            // hostname: hostname()
        }
    })
);*/

app.get('/oauth2/callback', apiRoute);
app.get('/logout', apiRoute);
app.use('/api', apiRoute);


const logger = log4jui.getLogger('Application')
logger.info(`Started up on ${config.enviroment || 'local'} using ${config.protocol}`)

module.exports = app;
