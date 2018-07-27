const request = require('request-promise');
const proxy = require('../lib/proxy');
const config = require('../../config');

module.exports = (code, req) => {
    const secret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA';
    const Authorization = `Basic ${new Buffer(`${config.idam_client}:${secret}`).toString('base64')}`;
    const callback = `${config.protocol}://${req.get('host')}/${config.oauth_callback_url}`;
    const url = `${config.services.idam_api}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${callback}`;
    let options = {
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization
        }
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return request(options).then(data => JSON.parse(data));
};