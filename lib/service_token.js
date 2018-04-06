const otp = require('otp');
// const jwtDecode = require('jwt-decode');
const request = require('request');
// const fetch = require('../util/fetch');

const idamS2SUrl = 'http://betaDevBccidamS2SLB.reform.hmcts.net:80';
const serviceName = 'em_gw';
const secret = 'AAAAAAAAAAAAAAAA';

const cache = {};



// let sshProxy;
// function attachSSHProxy(proxy) {
//     if(process.env.NODE_ENV === 'local') {
//         let agent;
//         if(!sshProxy) {
            const SocksProxyAgent = require('socks-proxy-agent');
            const proxyUrl = 'socks://127.0.0.1:9091';
            agent = new SocksProxyAgent(proxyUrl, true);
//         }
//         proxy.agent = agent;
//     }
//     return proxy;
// }

const serviceTokenGenerator = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(secret);
    const oneTimePassword = otp({secret: secret}).totp();
    const body = {
        microservice: serviceName,
        oneTimePassword: oneTimePassword
    };


    request({
        url: `${idamS2SUrl}/testing-support/lease`,
        method: 'POST',

        // json:true,
        // agent: agent,
        form: `microservice=em_gw`,
    }, (err, res, body) => {
        console.log(err);
        console.log(res.statusCode);
        console.log(body);
    })





}

module.exports = serviceTokenGenerator