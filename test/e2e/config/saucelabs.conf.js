const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const tagProcessor = require('../support/tagProcessor');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));


// exports.config = {
/**
 * Angular 2 configuration
 *
 * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
 * `rootEl`
 *
 */

// directConnect: true,

// framework: 'custom',
// frameworkPath: require.resolve('protractor-cucumber-framework'),

// specs: ['../features/**/*.feature'],


const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/**/*.feature'],
    baseUrl: process.env.TEST_URL || 'http://localhost:3000/',
    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD

    },

    useAllAngular2AppRoots: true,

    /* SAUCELABS CONFIG */
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,


    multiCapabilities: [
        {
            browserName: 'firefox',
            version: '61.0',
            platform: 'macOS 10.13',
            name: 'firefox-tests',
            shardTestFiles: true,
            maxInstances: 1
        }, {
            browserName: 'chrome',
            version: 'latest',
            platform: 'Windows 7',
            name: 'chrome-tests',
            shardTestFiles: true,
            maxInstances: 1
        }
    ],


    // baseUrl:'https://jui-webapp-aat.service.core-compute-aat.internal/',

    exclude: [],

    getPageTimeout: 500000,
    allScriptsTimeout: 600000,
    restartBrowserBetweenTests: true,
    untrackOutstandingTimeouts: true,


    cucumberOpts: {
        require: ['../support/world.js', '../support/*.js', '../features/step_definitions/**/*.steps.js'],
        format: 'pretty'
        // tags: '@login'
    },


    onComplete() {
        const printSessionId = function(jobName) {
            browser.getSession()
                .then(session => {
                    console.log(`SauceOnDemandSessionID=${session.getId()} job-name=${jobName}`);
                });
        };
        printSessionId('Insert Job Name Here');
    },


    // multiCapabilities: [
    //     {
    //         'platform': 'Windows 8',
    //         'browserName': 'chrome',
    //         'version': 'latest',
    //         name: "chrome-tests",
    //         // shardTestFiles: true,
    //         // maxInstances: 1
    //         // "tunnel-identifier": 'saucelabs-crossbrowser'
    //     }
    //
    //
    //     // {
    //     //     'platform': 'Windows 7',
    //     //     'browserName': 'firefox',
    //     //     'version': '60.0'
    //     // },
    //     //
    //     // {
    //     //     'browserName': 'internet explorer',
    //     //     'name': 'IE11_Win7',
    //     //     'platform': 'Windows 7',
    //     //     'version': '11'
    //     // },
    //     //
    //     //
    //     // {
    //     //     'browserName': 'internet explorer',
    //     //     'name': 'IE10_Win7',
    //     //     'platform': 'Windows 7',
    //     // },
    //     //
    //     // {
    //     //     'browserName': 'MicrosoftEdge',
    //     //     'name': 'IEEdge_LATEST',
    //     //     'platform': 'Windows 10',
    //     //     'version': 'latest'
    //     // }
    // ],


    onPrepare() {
        const caps = browser.getCapabilities();
        browser.manage()
            .window()
            .maximize();
        browser.waitForAngularEnabled(false);
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;
    }


};
config.cucumberOpts.tags = tagProcessor(config, argv);

exports.config = config;
