const serviceTokenGenerator = require('../lib/service-token');

module.exports = async  (req,res,next) => {
    const token = await serviceTokenGenerator();
    req.headers['ServiceAuthorization'] = token.token;
    next()
};