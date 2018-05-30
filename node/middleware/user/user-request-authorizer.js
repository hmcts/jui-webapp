const userResolver = require('./user-resolver')

const AUTHORIZATION = 'Authorization'
const SECURITY_COOKIE = '__auth-token'

const ERROR_TOKEN_MISSING = {
  error: 'Bearer token missing',
  status: 401,
  message: 'You are not authorized to access this resource'
}
const ERROR_UNAUTHORISED_ROLE = {
  error: 'Unauthorised role',
  status: 403,
  message: 'You are not authorized to access this resource'
}
const ERROR_UNAUTHORISED_USER_ID = {
  error: 'Unauthorised user',
  status: 403,
  message: 'You are not authorized to access this resource'
}

const authorise = (request) => {
  let user;
  let bearerToken = request.get(AUTHORIZATION);

  if (request.cookies !== undefined) {
    bearerToken = request.cookies[SECURITY_COOKIE]
    request.headers[AUTHORIZATION] = bearerToken
  }

  if (!bearerToken) {
    return Promise.reject(ERROR_TOKEN_MISSING)
  }

  return userResolver
    .getTokenDetails(bearerToken)
    .then(tokenDetails => {
      if (!tokenDetails.id) {
        throw new Error('No user ID returned from IDAM')
      }
      user = tokenDetails;
      return null
    })
    .then(() => user)
};

exports.ERROR_TOKEN_MISSING = ERROR_TOKEN_MISSING;
exports.ERROR_UNAUTHORISED_ROLE = ERROR_UNAUTHORISED_ROLE;
exports.ERROR_UNAUTHORISED_USER_ID = ERROR_UNAUTHORISED_USER_ID;
exports.authorise = authorise;
