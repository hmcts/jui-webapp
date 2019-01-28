let _agent
// @todo - is this redundant? Does not appear to be used
module.exports = configuration => {
    if (!_agent) {
        const SocksProxyAgent = require('socks-proxy-agent')

        const proxyUrl = 'socks://127.0.0.1:9090'
        _agent = new SocksProxyAgent(proxyUrl, true)
    }
    configuration.agent = _agent
    return configuration
}
