const userRequestAuthorizer = require('./user-request-authorizer')
const { Logger } = require('@hmcts/nodejs-logging')
const logger = Logger.getLogger('auth-checker-user-only-filter.js')

const authCheckerUserOnlyFilter = (req, res, next) => {

    req.authentication = {}

    userRequestAuthorizer
      .authorise(req)
      .then(user => {
        req.authentication.user = user
        req.headers['user-id'] = user.id
        req.headers['user-roles'] = user.roles.join(',')
        return null
      })
      .then(() => next())
      .catch(error => {
        let logEntry = (error.error ? JSON.stringify(error) : { message: 'Unsuccessful user authentication'})
        logger.warn(logEntry)
        // Just return 401 as idam returns 400 for bad token.
        error.status = error.status && error.status !== 400 ? error.status : 401
        next(error)
      });
}

module.exports = authCheckerUserOnlyFilter
