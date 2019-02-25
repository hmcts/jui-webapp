import { config } from '../../../config'
let _agent

export default configuration => {
    if (!_agent) {
        const SocksProxyAgent = require('socks-proxy-agent')

        const proxyUrl = `http://${config.proxy.host}:${config.proxy.port}`
        _agent = new SocksProxyAgent(proxyUrl, true)
    }
    configuration.agent = _agent
    return configuration
}
