const {expect, assert} = require('chai');
const config = require('./config');
const {setWorldConstructor} = require('cucumber');

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

console.log('world!');

// const users = [
//     'bdd_user_1@informa.com',
//     'bdd_user_2@informa.com',
//     'bdd_user_3@informa.com',
//     'bdd_user_4@informa.com',
//     'bdd_user_5@informa.com',
//     'bdd_user_6@informa.com',
//     'bdd_user_7@informa.com',
//     'bdd_user_8@informa.com',
//     'bdd_user_9@informa.com',
//     'bdd_user_10@informa.com'
// ];
// const password = '06T$ster';

function processRecursive(part) {
    if (part in config.lookups) {
        if (config.lookups[part].indexOf('|') === -1) {
            return config.lookups[part];
        } else {
            return processSelector(config.lookups[part]);
        }
    }
}

function processSelector(selector) {
    if (selector.search(/\s/ig) !== -1) {
        throw new Error('selector cannot contain spaces');
    }
    return selector.split('|')
        .map(level => level.split('.')
            .map(part => processRecursive(part) || `[data-selector~="${part}"]`)
            .join(''))
        .join(' ');
}

const seconds = n => n * 1000;

class World {

    constructor({attach, parameters}) {
        console.log(attach);
        console.log(parameters)
        this.attach = attach;


        this.assert = assert;
        this.expect = expect;
        this.client = browser;
        // this.useapi = argv.useapi;
        //
        // this.api = {
        //     auth: new AuthClient({
        //         baseUrl: 'https://ovumforecaster.eu.auth0.com',
        //         clientId: 'Vgr41tJnuOHOFVBTZweJ21OsKmz9E6AY',
        //         clientSecret: 'Mk-lXlScVxCgBVx7-ZZraXgneJX0nsSD3krvuKbz8GLH6EhdU7GBF9IZs58JzH9p',
        //         audience: 'https://api.forecaster.dev.tmt.informa-labs.com/',
        //         realm: 'Ovum-Forecaster-SAMS-DEV',
        //         responseType: 'token id_token'
        //     }),
        //     bookmark: {
        //         client: accessToken => new BookmarkClient({
        //             baseUrl: 'https://forecaster-api.dev.tmt.informa-labs.com',
        //             accessToken: accessToken
        //         })
        //     }
        // };

        // The timeout for individual expectations
        this.EXPECTATION_TIMEOUT = seconds(90);

        this.config = config;
        this.config.serverUrls = global.browser.params.serverUrls;
        this.config.targetEnv = global.browser.params.targetEnv;
    }

    getSelector(field) {
        return processSelector(field);
    }

    getUser() {

        // World is regenerated for every scenario, we want to
        // ensure that the same user is used for the scenario.
        if (!this.user) {
            this.user = {
                email: users[Math.floor(Math.random() * users.length)],
                password: password
            };
        }
        return this.user;
    }

    getAccessToken() {
        if (!global._authObj) {
            if (global._sessions && global._sessions.length) {
                const randomUser = Math.floor(Math.random() * 10);
                global._authObj = global._sessions[randomUser];
            }
        }

        if (!global._authObj) {
            console.log('********************LOGIN!!!*******************************');
            const user = this.getUser();
            return this.api.auth.getAccessToken(user.email, user.password)
                .then(body => {
                    return body;
                });
        } else {
            console.log('*********ALREADY LOGGED IN****************');
            return Promise.resolve(global._authObj);
        }
    }

    getBookmarkClient() {
        return this.getAccessToken().then(accessToken => {
            return this.api.bookmark.client(accessToken.access_token)
        });
    }
}

setWorldConstructor(World);
// After(function (result) {
//     // if (result.status === 'failed') {
//     //     const logs = this.client.log('browser').value.map(log => {
//     //         return `[${log.level}] - ${log.timestamp} - ${log.message}`;
//     //     }).join('\n');
//     //     const scenario = result.scenario.name;
//     //     console.error(`-----FAILURE-----\nScenario: ${scenario}\nBrowser logs:\n${logs}`);
//     // }
// });
