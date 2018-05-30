/* eslint-disable max-lines */
'use strict';

const request = require('superagent');
const URL = require("url");
const UUID = require("uuid/v4");
const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('security.js');

const SECURITY_COOKIE = '__auth-token';
// const REDIRECT_COOKIE = '__redirect';
const REDIRECT_PARAM = 'redirect_uri';

const ACCESS_TOKEN_OAUTH2 = 'access_token';

function Security(options) {
    this.opts = options || {};

    if (!this.opts.loginUrl) {
        throw new Error('login URL required for Security');
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Login Redirect Code
function login(req, res, roles, self) {
    const originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let state = generateUUIDState();
    storeRedirectCookie(req, res, originalUrl, state);
    let url = (roles.includes('letter-holder')) ?  URL.parse(self.opts.loginUrl + "/pin", true) : URL.parse(self.opts.loginUrl, true);
    addOAuth2Parameters(url, state, self, req);
    res.redirect(url.format());
}

function addOAuth2Parameters(url, state, self, req) {
    url.query.response_type = "code";
    url.query.state = state;
    url.query.client_id = self.opts.clientId;
    url.query.redirect_uri = req.protocol + "://" + req.get('host') + self.opts.redirectUri;
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

Security.prototype.logout = function () {
    const self = {opts: this.opts};

// eslint-disable-next-line no-unused-vars
    return function (req, res, next) {

        // let token = req.cookies[SECURITY_COOKIE];

        res.clearCookie(SECURITY_COOKIE);
        res.clearCookie(REDIRECT_COOKIE);

        // if (token) {
        //   res.redirect(self.opts.loginUrl + "/logout?jwt=" + token);
        // } else {
        //   res.redirect(self.opts.loginUrl + "/logout");
        // }
        res.redirect("/");
    }

};


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Not sure what this is sooo...
// Security.prototype.protect = function (roles) {
//   const self = {
//     roles: roles || [],
//     new: false,
//     opts: this.opts
//   };
//
//   return function (req, res, next) {
//     protectImpl(req, res, next, self);
//   };
// };

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Not sure what this is sooo...
// Security.prototype.protectWithAnyOf = function (roles) {
//   const self = {
//     roles: roles,
//     new: false,
//     opts: this.opts
//   };
//
//   return function (req, res, next) {
//     protectImpl(req, res, next, self);
//   };
// };

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// function protectImpl(req, res, next, self) {
//   //req.log = logger(req.sessionID);
//   let securityCookie = handleCookie(req);
//   if (!securityCookie) {
//     return login(req, res, self.roles, self);
//   }
//
//   getUserDetails(self, securityCookie).end(
//     function (err, response) {
//       if (err) {
//         if (!err.status) {
//           err.status = 500;
//         }
//         switch (err.status) {
//           case 401 :
//             return login(req, res, self.roles, self);
//           case 403 :
//             return forbidAccess(next, "Access Forbidden");
//           default :
//             return next({status: err.status, details: JSON.stringify(err)});
//         }
//       }
//       req.roles = response.body.roles;
//       req.userInfo = response.body;
//       authorize(req.roles, res, next, self);
//     });
// }
//
// function handleCookie(req) {
//     if (req.cookies && req.cookies[SECURITY_COOKIE]) {
//         req.authToken = req.cookies[SECURITY_COOKIE];
//         return req.authToken;
//     }
//     return null;
// }

Security.prototype.IdamDetails = function () {
    const self = {opts: this.opts};

    return function (req, res, next) {
        getUserDetails(self,req.cookies[SECURITY_COOKIE]).end(function (err, response) { /* We ask for the token */
            if (err) {
                return denyAccess(next, err);
            }
            res.send(response.body);
        });
    }
};

function getUserDetails(self, securityCookie) {
    return request.get(self.opts.apiUrl + "/details")
        .set('Accept', 'application/json')
        .set('Authorization', "Bearer " + securityCookie);
}
//
// function authorize(roles, res, next, self) {
//   if(!self.roles.length){
//     return next();
//   }
//
//   if (roles !== null) {
//     for (let role in self.roles) {
//       if (roles.includes(self.roles[role])) {
//         return next();
//       }
//     }
//   }
//   return forbidAccess(next, 'ERROR: Access forbidden - User does not have any of ' + self.roles + '. Actual roles:' + roles);
// }


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Not sure what this is sooo...
// Security.prototype.protectWithUplift = function (role, roleToUplift) {
//
//   const self = {
//     role: role,
//     roleToUplift: roleToUplift,
//     new: false,
//     opts: this.opts
//   };
//
//   return function (req, res, next) {
//     //req.log = logger(req.sessionID);
//
//     /* Read the value of the token from the cookie */
//     let securityCookie = handleCookie(req);
//
//     if (!securityCookie) {
//       return login(req, res, self.role, self);
//     }
//
//     getUserDetails(self, securityCookie)
//       .end(function (err, response) {
//
//         if (err) {
//
//           /* If the token is expired we want to go to login.
//           * - This invalidates correctly sessions of letter users that does not exist anymore
//           */
//           if (err.status === 401) {
//             return login(req, res, [], self);
//           } else {
//             return denyAccess(next, err + ": " + response.text);
//           }
//         }
//
//         req.roles = response.body.roles;
//         req.userInfo = response.body;
//
//         if (req.roles.includes(self.role)) { /* LOGGED IN ALREADY WITH THE UPLIFTED USER */
//           return next();
//         }
//
//         if (!req.roles.includes(self.roleToUplift)) {
//           return denyAccess(next, "This user can not uplift");
//         }
//
//         /* REDIRECT TO UPLIFT PAGE */
//         const originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//
//         let state = generateUUIDState();
//         storeRedirectCookie(req, res, originalUrl, state);
//
//         let url = URL.parse(self.opts.loginUrl + "/uplift", true);
//         addOAuth2Parameters(url, state, self, req);
//         url.query.jwt = securityCookie;
//
//         res.redirect(url.format());
//
//       });
//   };
// };

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function generateUUIDState() {
    return UUID();
}

function storeRedirectCookie(req, res, continue_url, state) {
    let url = URL.parse(continue_url);
    let cookieValue = {continue_url: url.path, state: state};
    if (req.protocol === "https") {
        res.cookie(REDIRECT_COOKIE, JSON.stringify(cookieValue), {secure: true, httpOnly: true});
    } else {
        res.cookie(REDIRECT_COOKIE, JSON.stringify(cookieValue), {httpOnly: true});
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// oAuth CallBack
Security.prototype.OAuth2CallbackEndpoint = function () {
    const self = {opts: this.opts};

    return function (req, res, next) {
        res.clearCookie(SECURITY_COOKIE); // We clear any potential existing sessions first, as we want to start over even if we deny access

        let redirectInfo = getRedirectCookie(req); // We check that our stored state matches the requested one

        if (!redirectInfo) {
            console.log("Redirect cookie is missing");
            return denyAccess(next, "Redirect cookie is missing");
        }

        // Somehow the state is not pass to the back
        // if (redirectInfo.state !== req.query.state) {
        //   console.log("States do not match: " + redirectInfo.state + " is not " + req.query.state);
        //   return denyAccess(next, "States do not match: " + redirectInfo.state + " is not " + req.query.state);
        // }

        // if (!redirectInfo.continue_url.startsWith('/')) {
        //   console.log("Invalid redirect_uri: " + redirectInfo.continue_url);
        //   return denyAccess(next, "Invalid redirect_uri: " + redirectInfo.continue_url);
        // }

        if (!req.query.code) {
            console.log(redirectInfo.continue_url);
            return res.redirect(redirectInfo.continue_url);
        }

        getTokenFromCode(self, req).end(function (err, response) { /* We ask for the token */
            if (err) {
                return denyAccess(next, err);
            }
            // storeCookie(req, res, response.body[ACCESS_TOKEN_OAUTH2]); // We store it in a session cookie
            // res.clearCookie(REDIRECT_COOKIE); // We delete redirect cookie
            // res.redirect(redirectInfo.continue_url); // And we redirect back to where we originally tried to access
            // res.redirect('http://localhost:3000'); // And we redirect back to where we originally tried to access
            res.send(response.body);
        });
    }
};

function getRedirectCookie(req) {
    // return (!req.cookies[REDIRECT_COOKIE]) ? null : JSON.parse(req.cookies[REDIRECT_COOKIE]);
    return (!req.query[REDIRECT_PARAM]) ? null : {continue_url: req.query[REDIRECT_PARAM]};
}

function getTokenFromCode(self, req) {
    let url = URL.parse(self.opts.apiUrl + "/oauth2/token", true);
    return request.post(url.format())
        .auth(self.opts.clientId, self.opts.clientSecret)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .type('form')
        .send({"grant_type": 'authorization_code'})
        .send({"code": req.query.code})
        .send({"redirect_uri": req.query.redirect_uri});
}

function storeCookie(req, res, token) {
    req.authToken = token;

    if (req.protocol === "https") { /* SECURE */
        res.cookie(SECURITY_COOKIE, req.authToken, {secure: true, httpOnly: true});
    } else {
        res.cookie(SECURITY_COOKIE, req.authToken, {httpOnly: true});
    }
}

// DenyMethods
function denyAccess(next, msg) {
    next({status: 401, code: "UNAUTHORIZED", error: msg});
}

function forbidAccess(next, msg) {
    next({status: 403, code: "FORBIDDEN", error: msg});
}

module.exports = Security;
