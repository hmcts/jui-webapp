// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const webpackConfig = require('./webpack.config');
// const compiler = webpack(webpackConfig);
const express = require('express');
const app = express();
const serviceTokenMiddleware = require('./middleware/service-token');


app.get('/health', (req,res) => {
    res.status(200).send('ok');
});

app.use(serviceTokenMiddleware);


const dmProxy = require('./proxies/dm');
dmProxy(app);




// const bob = require('./lib/service-token');
// bob();



app.listen(3001, () => console.log('Example app listening on port 3001!'));