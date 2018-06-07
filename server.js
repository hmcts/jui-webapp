const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');
require( 'zone.js/dist/zone-node');
const apiRoute = require('./api');
const config = require('./config');
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

app.get('/*', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('./dist/index', {
        req: req,
        res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(process.env.PORT || 3000, () => {});
