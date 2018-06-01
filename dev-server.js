const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');
const express = require('express');
const apiRoute = require('./api');
const serviceTokenMiddleware = require('./middleware/service-token');
const config = require('./config');
const app = express();





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


app.listen(3001, () => console.log('Example app listening on port 3001!'));
