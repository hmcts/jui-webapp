const url = require('url');
const https = require('https');
const fs = require('fs');
let proxyMiddleware = require('http-proxy-middleware');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_ENV = process.env.NODE_ENV || 'local';


let target = 'https://dm-store-aat.service.core-compute-aat.internal';


let sshProxy;
function attachSSHProxy(proxy) {
    if(process.env.NODE_ENV === 'local') {
        let agent;
        if(!sshProxy) {
            const SocksProxyAgent = require('socks-proxy-agent');
            const proxyUrl = 'socks://127.0.0.1:9090';
            agent = new SocksProxyAgent(proxyUrl, true);
        }
        proxy.agent = agent;
    }
    return proxy;
}







module.exports = app => {

    const proxyConfig = attachSSHProxy({
        target: target,
        // logLevel: 'debug',
        secure: false,
        rejectUnauthorized: false,
        changeOrigin: true,
        pathRewrite: {
            '/demproxy/dm/': '/'
        },
        // headers: {
        //     'ServiceAuthorization': divToken,
        //     'user-id': "test12@test.com",
        //     'user-roles': "caseworker-cmc"
        // },
        onProxyRes: (proxyRes, req, res) => {
            console.log(proxyRes.statusCode);
            // console.log(req.url);
        }
    });


    // let bob;
    app.get('/demproxy/dm/*', proxyMiddleware(proxyConfig));

    // app.get('/demproxy/dm', (req, res) => {
    //
    //     var bob = attachSSHProxy({});
    //
    //
    //     var endpoint = 'https://dm-store-app-aat-staging.service.core-compute-aat.internal/documents/ff89843f-71a7-49c1-a879-50e3655d8d7c';
    //
    //     var opts = url.parse(endpoint);
    //     opts.agent = bob.agent;
    //     // opts.method = 'get';
    //     console.log(opts);
    //     opts.headers = {
    //         'ServiceAuthorization': token,
    //             'user-id': "test12@test.com",
    //             'user-roles': "caseworker-cmc"
    //     };
    //     https.get(opts, function (response) {
    //         console.log(response.request);
    //         // console.log('"response" event!', res);
    //         // console.log(response.statusCode);
    //         response.pipe(res);
    //     });
    // });


//     app.get('/demproxy/dm/documents', (req, res) => {
//
//         var endpoint = process.argv[2] || 'https://api-gateway.test.dm.reform.hmcts.net/documents/fb337199-a585-47a0-bc1d-15b699cbab79';
//
//         var opts = url.parse(endpoint);
//         opts.agent = agent;
//         opts.headers = {
//             'ServiceAuthorization': "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbV9ndyIsImV4cCI6MTUyMTc0OTg2Mn0.Qz_nTm0IGS_muY3QH5K7ZO8dZ7YhujWwMJNyUICnFVwuthVH59kK9Rlh2XA6W1cAo0e7RkHHSic5weMa2x5T9A",
//             'user-id': "12",
//             'user-roles': "caseworker-cmc",
//             "Authorization": token
//         };
//         // opts.method = 'get';
// console.log(opts);
//         https.get(opts, function (response) {
//             // console.log('"response" event!', res);
//             console.log(response.statusCode);
//             response.pipe(res);
//         });
//     });
    //
    // app.get('/demproxy/dm/documents/fb337199-a585-47a0-bc1d-15b699cbab79/binary', (req, res) => {
    //
    //
    //
    //     var endpoint = process.argv[2] || 'https://api-gateway.test.dm.reform.hmcts.net/documents/fb337199-a585-47a0-bc1d-15b699cbab79/binary';
    //
    //     var opts = url.parse(endpoint);
    //     opts.agent = agent;
    //     opts.headers = {
    //         'ServiceAuthorization': "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbV9ndyIsImV4cCI6MTUyMTc0OTg2Mn0.Qz_nTm0IGS_muY3QH5K7ZO8dZ7YhujWwMJNyUICnFVwuthVH59kK9Rlh2XA6W1cAo0e7RkHHSic5weMa2x5T9A",
    //         'user-id': "12",
    //         'user-roles': "caseworker-cmc",
    //         "Authorization": token
    //     };
    //     // opts.method = 'get';
    //
    //     https.get(opts, function (response) {
    //         // console.log('"response" event!', res);
    //         console.log(response.statusCode);
    //         response.pipe(res);
    //     });
    // });
}


