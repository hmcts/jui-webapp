// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const webpackConfig = require('./webpack.config');
// const compiler = webpack(webpackConfig);
const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');
const express = require('express');
const app = express();
const serviceTokenMiddleware = require('./middleware/service-token');
const apiRoute = require('./api');

// THIS IS EXTERNAL ENDPOINT WE NEED TO FIND A WAY TO MOVE THIS TO A CONFIG FILE...
const S2S_URI = process.env.S2S_URI || 'http://localhost:4501';
const IDAM_API_URI = process.env.IDAM_API_URI || 'http://localhost:4502';
const CCD_URI = process.env.CCD_URI  || 'http://localhost:1234';
const DM_STORE_URI = process.env.DM_STORE_URI || 'http://localhost:4603';
const EM_ANNO_URI = process.env.EM_ANNO_URI || 'http://localhost:3621';
const EM_REDACT_URI = process.env.EM_REDACT_URI || 'http://localhost:3623';

app.get("/health", healthcheck.configure({
  checks: {
    'dmStore' : healthcheck.web(DM_STORE_URI + "/health"),
    // 'emAnno' : healthcheck.web(EM_ANNO_URI + "/health"),
    // 'emRedact' : healthcheck.web(EM_REDACT_URI + "/health"),
    // 'ccd' : healthcheck.web(CCD_URI + "/health"),
    'idam' : healthcheck.web(IDAM_API_URI + "/health"),
    's2s' : healthcheck.web(S2S_URI + "/health")
  },
  buildInfo: {

  }
}));

app.get('/info', infoRequestHandler({
  info: {
    'dmStore' : new InfoContributor(DM_STORE_URI + "/info"),
    // 'emAnno' : new InfoContributor(EM_ANNO_URI + "/info"),
    // 'emRedact' : new InfoContributor(EM_REDACT_URI + "/info"),
    // 'ccd' : new InfoContributor(CCD_URI + "/info"),
    'idam' : new InfoContributor(IDAM_API_URI + "/info"),
    's2s' : new InfoContributor(S2S_URI + "/info")
  },
  extraBuildInfo: {
    // featureToggles: config.get('featureToggles'),
    // hostname: hostname()
  }
}));


app.use('/api', apiRoute);

app.use(serviceTokenMiddleware);


const dmProxy = require('./proxies/dm');
dmProxy(app);




// const bob = require('./lib/service-token');
// bob();



app.listen(3001, () => console.log('Example app listening on port 3001!'));
