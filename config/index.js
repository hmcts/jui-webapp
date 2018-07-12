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
    prod: require('./environments/prod.config.js')
};
const env = typeof(process) !== 'undefined' ? (process.env.JUI_ENV || 'docker') : 'docker';
console.log('Using ' + env + ' Config');
module.exports = Object.assign(applicationConfig, config[env]);
