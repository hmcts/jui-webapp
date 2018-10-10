const config = require('../../config');
const proxy = require('../lib/proxy');

module.exports = req => {
    let options = {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-roles': req.auth.data
        },
        json: true
    };
    if (config.useProxy) {
        options = proxy(options);
    }
    return options;
};
