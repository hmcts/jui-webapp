const applicationConfig = require('./application.config');

const config = {
    local: require('./environments/local.config.js'),
    docker: require('./environments/docker.config.js'),
    spreview: require('./environments/spreview.config.js'),
    saat: require('./environments/saat.config.js'),
    sprod: require('./environments/sprod.config.js'),
    preview: require('./environments/preview.config.js'),
    demo: require('./environments/demo.config.js'),
    aat: require('./environments/aat.config.js'),
    prod: require('./environments/prod.config.js'),
    mock: require('./environments/mock.config.js'),
    microservice: 'jui_webapp',
    idam_client: 'juiwebapp',
    oauth_callback_url: 'oauth2/callback',
    protocol: 'https'
};

const configEnv = typeof (process) !== 'undefined' ? (process.env.JUI_ENV || 'local') : 'local';
console.log('Using', configEnv, 'Config');

module.exports = Object.assign(applicationConfig, config[configEnv], { configEnv });
