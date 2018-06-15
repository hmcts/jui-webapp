const request = require('request-promise');
const proxy = require('../lib/proxy');
const config = require('../../config');

module.exports = (code) => {
    const secret = process.env.IDAM_SECRET || "AAAAAAAAAAAAAAAA";
    const Authorization = 'Basic ' + new Buffer(`${config.idam_client}:${secret}`).toString('base64');
    let url = `${config.services.idam_api}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${config.oauth_callback_url}`;
    let options = {
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': Authorization
        }
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return request(options).then(data => JSON.parse(data));
};