const express = require('express');
const cookieParser = require('cookie-parser');
const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');

const apiRoute = require('./api');
app.use(cookieParser());
const serviceTokenMiddleware = require('./middleware/service-token');
const config = require('./config');
const app = express();



const Security = require('./node/lib/idam/security');
const security = new Security(config.get('idam'));
app.use('/logout', security.logout());
app.use('/node/oauth2/callback', security.OAuth2CallbackEndpoint());
app.use('/node/idam/details', security.IdamDetails());



app.get("/health", healthcheck.configure({
  checks: {
    'dmStore' : healthcheck.web(`${config.services.dm}/health`),
    'idam' : healthcheck.web(`${config.services.idam}/health`),
    's2s' : healthcheck.web(`${config.services.s2s}/health`)
  },
  buildInfo: {

    }
}));

app.get('/info', infoRequestHandler({
  info: {
      'dmStore' : healthcheck.web(`${config.services.dm}/info`),
      'idam' : healthcheck.web(`${config.services.idam}/info`),
      's2s' : healthcheck.web(`${config.services.s2s}/info`)
  },
  extraBuildInfo: {
    // featureToggles: config.get('featureToggles'),
    // hostname: hostname()
  }
}));
app.use(serviceTokenMiddleware);
app.use('/api', apiRoute);

const dmProxy = require('./node/proxies/dm');
dmProxy(app);
app.listen(3001, () => console.log('Example app listening on port 3001!'));
