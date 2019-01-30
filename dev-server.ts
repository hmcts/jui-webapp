const app = require('./application');
import { config } from './config';
import * as globalTunnel from 'global-tunnel-ng';

if (config.proxy) {
    globalTunnel.initialize({
        host: config.proxy.host,
        port: config.proxy.port,
    })
}

app.listen(3001, () => console.log('Example app listening on port 3001!'));
