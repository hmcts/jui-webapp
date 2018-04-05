// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
// const webpackConfig = require('./webpack.config');
// const compiler = webpack(webpackConfig);
const express = require('express');
const app = express();

const dmProxy = require('./proxies/dm');
dmProxy(app);

//
// app.use((req,res) => {
//     res.status(200).send('ok');
// })

app.listen(3001, () => console.log('Example app listening on port 3001!'));