const app = require('./application');
// require( 'zone.js/dist/zone-node');
import * as express from 'express';
import * as path from 'path';

const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
} = require('../jui-frontend/server/main');

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

app.use(express.static(path.join(__dirname, '..', 'assets'), { index: false }));
app.use(express.static(path.join(__dirname, '..', 'jui-frontend', 'main'), { index: false }));

app.use('/*', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../jui-frontend/main/index', {
        req,
        res,
        providers: [
            { provide: 'REQUEST', useValue: req },
            { provide: 'RESPONSE', useValue: res }
        ]
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(process.env.PORT || 3000, () => { });
