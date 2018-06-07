const jwtDecode = require('jwt-decode');
const config = require('../../config');

module.exports = (req, res, next) => {
    const userId = req.cookies['__USERID__'];
    const jwt = req.cookies[config.cookieName];
    const jwtData = jwtDecode(jwt);
    const expired = jwtData.exp > new Date().getTime();

    if(expired) {
        res.status(401).send('Token expired!');
    }
    else {
        req.auth = jwtData;
        req.auth.token = jwt;
        req.auth.userId = userId;
        next();
    }
};