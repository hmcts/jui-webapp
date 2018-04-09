const serviceTokenGenerator = require('../lib/service-token');

module.exports = async  (req,res,next) => {
    const token = await serviceTokenGenerator();
    // const data = await PromiseBasedDataRequest(endpoint);
    req.headers['ServiceAuthorization'] = token.token;
    req.headers['user-roles'] = 'caseworker-cmc';
    next()
};