const otp = require('otp');
const jwtDecode = require('jwt-decode');
const request = require('request');

// const S2S_URI = process.env.S2S_URI || 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal';
const S2S_URI = process.env.S2S_URI || 'http://localhost:4502';
const microservice = process.env.JUI_MICROSERVICE || 'em_gw';
const secret = process.env.JUI_SECRET ||  'AAAAAAAAAAAAAAAA';

let agent;
let sshProxy;
let _cache = {};

function attachSSHProxy(proxy) {
  if(process.env.NODE_ENV === 'local' && !proxy.url.startsWith('http://localhost')) {
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

function validateCache() {
  const currentTime = Math.floor(Date.now() / 1000);
  if(!_cache[microservice]) return false;
  return currentTime < _cache[microservice].expiresAt;
}

function getToken() {
  return _cache[microservice];
}

function generateToken() {
  const oneTimePassword = otp({secret: secret}).totp();
  const options = attachSSHProxy({
    url: `${S2S_URI}/lease`,
    method: 'POST',
    agent: agent,
    body: {
      oneTimePassword: oneTimePassword,
      microservice: microservice
    },
    json: true
  });

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      console.log(err);
      // console.log(res.statusCode);
      console.log(body);

      const tokenData = jwtDecode(body);
      _cache[microservice] = {
        expiresAt: tokenData.exp,
        token: body
      };
      console.log(tokenData);
      resolve();
    });
  });
}


function serviceTokenGenerator() {
  return new Promise((resolve, reject) => {

    // if(validateCache()) {
    //     resolve(getToken());
    // }
    // else {
    generateToken().then(() => {
      resolve(getToken());
    })
    // }
  });

}

module.exports = serviceTokenGenerator;
