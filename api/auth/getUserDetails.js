const request = require('request-promise');
const config = require('../../config');
const proxy = require('../lib/proxy');

module.exports = jwt => {
    const Authorization = `Bearer ${jwt}`;
    const url = `${config.services.idam_api}/details`;
    let options = {
        url,
        method: 'GET',
        headers: { Authorization }
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return request(options).then(data => JSON.parse(data));
};
