let proxyMiddleware = require('http-proxy-middleware');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const config = require('config');
const DM_STORE_URI = config.get('dm_store_uri');

let sshProxy;
function attachSSHProxy(proxy) {
    if(process.env.NODE_ENV === 'local' && !proxy.target.startsWith('http://localhost')) {
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
        target: DM_STORE_URI,
        logLevel: 'debug',
        secure: false,
        rejectUnauthorized: false,
        changeOrigin: true,
        pathRewrite: {
            '/demproxy/dm/': '/'
        },
        onProxyRes: (proxyRes, req, res) => {
            console.log(proxyRes.statusCode);
        }
    });
    app.get('/demproxy/dm/*', proxyMiddleware(proxyConfig));
};


