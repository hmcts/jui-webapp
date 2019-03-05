/*const healthcheck = require('@hmcts/nodejs-healthcheck');*/
/*const { InfoContributor, infoRequestHandler } = require('@hmcts/info-provider');*/

import * as express from 'express';
import { config } from './config';
import { appInsights } from './api/lib/appInsights';
import { securityHeaders } from './api/lib/middleware/securityHeaders';
import * as log4jui from './api/lib/log4jui';
import * as globalTunnel from 'global-tunnel-ng';

const apiRoute = require('./api');
config.environment = process.env.JUI_ENV || 'local';

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const sessionFileStore = require('session-file-store');

const FileStore = sessionFileStore(session);

app.use(securityHeaders);

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

app.use((req, res, next) => {
    // Set cookie for angular to know which config to use
    const platform = process.env.JUI_ENV || 'local';
    res.cookie('platform', platform);
    next();
}
);


if (config.proxy) {
    globalTunnel.initialize({
        host: config.proxy.host,
        port: config.proxy.port,
    })
}


app.get('/oauth2/callback', apiRoute);
app.get('/logout', apiRoute);
app.use('/api', apiRoute);


const logger = log4jui.getLogger('Application')
logger.info(`Started up on ${config.environment || 'local'} using ${config.protocol}`)

module.exports = app;
