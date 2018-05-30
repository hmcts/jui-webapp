const config = {
    docker: require('./docker.config.js'),
    local: require('./local.config.js'),
    aat: require('./aat.config.js')
};
const env = typeof(process) !== 'undefined' ? (process.env.JUI_ENV || 'local') : 'local';
module.exports = config[env];