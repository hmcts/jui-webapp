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

app.get('/health', (req, res) => {
    res.status(200).end('ok');
});

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