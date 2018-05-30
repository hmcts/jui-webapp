const config = require('config');
const fetch = require('../util/fetch');

const { Logger } = require('@hmcts/nodejs-logging')
const logger = Logger.getLogger('user-resolver.js');

const getTokenDetails = (jwt) => {
  const bearerJwt = (jwt.startsWith('Bearer ') ? jwt : 'Bearer ' + jwt).replace(/"/g,'');
  return fetch(`${config.get('idam.apiUrl')}/details`, {
    headers: {
      'Authorization': bearerJwt
    }
  }).then(res => res.json())
    .catch(error => {
      logger.warn({
        message: 'Non 200 status received from IDAM when authenticating user. Is your token valid?'
        + ' Status Text: ' + error.statusText
        + ' Status: ' + error.status
        + ' url: ' + error.url
        + ' stackTrace: ' + error.stack
      })
      throw error
    })
};

exports.getTokenDetails = getTokenDetails;
