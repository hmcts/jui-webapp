const apiRoute = require('./api');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
require( 'zone.js/dist/zone-node');
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config = require('config');

const healthcheck = require('@hmcts/nodejs-healthcheck');
const { InfoContributor, infoRequestHandler  } = require('@hmcts/info-provider');
const serviceTokenMiddleware = require('./node/middleware/service/service-token');

const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
} = require(`./dist-server/main`);

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

const Security = require('./node/lib/idam/security');
const security = new Security(config.get('idam'));

app.use('/logout', security.logout());
app.use('/node/oauth2/callback', security.OAuth2CallbackEndpoint());
app.use('/node/idam/details', security.IdamDetails());

app.get("/config", (req, res) => {
    res.send(config.get('ng_config'));
});

app.get("/health", healthcheck.configure({
    checks: {
        'dmStore' : healthcheck.web(config.get('dm_store_uri') + "/health"),
        // 'emAnno' : healthcheck.web(config.get('em_anno_uri') + "/health"),
        // 'emRedact' : healthcheck.web(config.get('em_redact_uri') + "/health"),
        // 'ccd' : healthcheck.web(config.get('ccd_uri') + "/health"),
        'idam' : healthcheck.web(config.get('idam.apiUrl') + "/health"),
        's2s' : healthcheck.web(config.get('s2s.apiUrl') + "/health")
    },
    buildInfo: {

    }
}));

app.get('/info', infoRequestHandler({
    info: {
        'dmStore' : new InfoContributor(config.get('dm_store_uri') + "/info"),
        // 'emAnno' : new InfoContributor(config.get('em_anno_uri') + "/info"),
        // 'emRedact' : new InfoContributor(config.get('em_redact_uri') + "/info"),
        // 'ccd' : new InfoContributor(config.get('ccd_uri') + "/info"),
        'idam' : new InfoContributor(config.get('idam.apiUrl') + "/info"),
        's2s' : new InfoContributor(config.get('s2s.apiUrl') + "/info")
    },
    extraBuildInfo: {
        // featureToggles: config.get('featureToggles'),
        // hostname: hostname()
    }
}));


app.use(serviceTokenMiddleware);
app.use('/api', apiRoute);

const dmProxy = require('./proxies/dm');
dmProxy(app);

app.get('/*', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('./dist/index', {
        req: req,
        res: res,
        providers: [{
            provide: 'serverUrl',
            useValue: `${req.protocol}://${req.get('host')}`
        }]
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(process.env.PORT || 3000, () => {});
