const url = require('url');
const https = require('https');
const fs = require('fs');
let proxyMiddleware = require('http-proxy-middleware');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
// const baseUrl = 'https://api-gateway.test.dm.reform.hmcts.net';
let emToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbV9ndyIsImV4cCI6MTUyMzAzODgwMn0.yz5yi1Q-UW8511cBHxUDyhNAXQWEuPegYKfRln5FWy7zWcu62yc-qwoJfrov1aF-7Q_aBu5cNfJIgpa_cFji2g';
let divToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaXZvcmNlX2RvY3VtZW50X3VwbG9hZCIsImV4cCI6MTUyMzI3Nzk1M30.sJePMo6aIskqwq6CgP9u9e9_Yo7jogyPDW45EyAifZVn1llWcbNTtTgIIOHTn7yIdlEV7VWn7hFWn9VQ1vGDfw';



// token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbV9ndyIsImV4cCI6MTUyMjc2MjY3NX0.0yMbUaC1zQsvn-zREyOei5NpSY_ZEQctBb8iTmeR4hfF6gYL3tlB6Rxk3b7uuTL-bvew1M0ei6gRPsRz4x8Ig';
// const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJsMXNqZHJhNjUyZGQ0amFuMHEyNnVrMDFwciIsInN1YiI6IjY2ODciLCJpYXQiOjE1MjIyMjg1MzMsImV4cCI6MTUyMjI1NzMzMywiZGF0YSI6ImNhc2V3b3JrZXItcHJvYmF0ZSxjYXNld29ya2VyLWNtYyxjYXNld29ya2VyLXNzY3MsY2FzZXdvcmtlci1kaXZvcmNlLGNhc2V3b3JrZXItdGVzdCxjYXNld29ya2VyLXJlZmVyZW5jZS1kYXRhLGNhc2V3b3JrZXIsY2FzZXdvcmtlci1wcm9iYXRlLWxvYTEsY2FzZXdvcmtlci1jbWMtbG9hMSxjYXNld29ya2VyLXNzY3MtbG9hMSxjYXNld29ya2VyLWRpdm9yY2UtbG9hMSxjYXNld29ya2VyLXRlc3QtbG9hMSxjYXNld29ya2VyLXJlZmVyZW5jZS1kYXRhLWxvYTEsY2FzZXdvcmtlci1sb2ExIiwidHlwZSI6IkFDQ0VTUyIsImlkIjoiNjY4NyIsImZvcmVuYW1lIjoiQ0NEIiwic3VybmFtZSI6IldlYiBkb21haW4iLCJkZWZhdWx0LXNlcnZpY2UiOiJDQ0QiLCJsb2EiOjEsImRlZmF1bHQtdXJsIjoiaHR0cHM6Ly9jYXNlLXdvcmtlci13ZWIudGVzdC5jY2QucmVmb3JtLmhtY3RzLm5ldCIsImdyb3VwIjoiY2FzZXdvcmtlciJ9.p7d_Gx0_wOYnB-xeSXqAAyVYhAXzlg65a_gwdhhKO6A";


// let target = 'http://dm-store-app-sandbox-staging.service.core-compute-sandbox.internal';
let target = 'https://dm-store-app-aat-staging.service.core-compute-aat.internal';
// const target = `${baseUrl}/documents/fb337199-a585-47a0-bc1d-15b699cbab79`;



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


