const request = require('request-promise');
const proxy = require('../lib/proxy');
const config = require('../../config');

module.exports = function getUserDetails(jwt) {
    const Authorization = `Bearer ${jwt}`;
    let url = `${config.services.idam_api}/details`;
    let options = {
        url: url,
        method: 'GET',
        headers: {
            'Authorization': Authorization
        }
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return request(options).then(data => JSON.parse(data));
};