const config = require('../../config');
const proxy = require('../lib/proxy');

module.exports = req => {
    const token = req.auth.token;
    let options = {
        headers: {
            Authorization: `Bearer ${token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-roles': 'caseworker'
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return options;
};
