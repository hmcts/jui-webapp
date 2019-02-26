const app = require('./application');

import * as express from 'express';
import * as path from 'path';
import * as ejs from 'ejs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


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
