const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');
require( 'zone.js/dist/zone-node');

const express = require('express');
const serviceTokenMiddleware = require('./middleware/service-token');
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
} = require(`./dist-server/main`);

const app = express();

const {
    provideModuleMap
} = require('@nguniversal/module-map-ngfactory-loader');

const provider = provideModuleMap(LAZY_MODULE_MAP);

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provider]
    })
);

app.set('view engine', 'html');
app.set('views', __dirname);

app.use(express.static(__dirname + '/assets', { index: false }));
app.use(express.static(__dirname + '/dist', { index: false }));

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


app.use(serviceTokenMiddleware);

const dmProxy = require('./proxies/dm');
dmProxy(app);



app.get('/*', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('./dist/index', {
        req: req,
        res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(process.env.PORT || 3000, () => {});
