var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


exports.config = {
    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    //directConnect: true,
    useAllAngular2AppRoots: true,

    /* SAUCELABS CONFIG */
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    baseUrl: process.env.TEST_URL || 'http://localhost:3000/',

    exclude: [],

    getPageTimeout: 60000,
    allScriptsTimeout: 500000,

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: ['../features/**/*.feature'],

    cucumberOpts: {
        require: [
            '../support/world.js',
            '../support/*.js',
            '../features/step_definitions/**/*.steps.js'
        ],
        format: ["pretty"],
        tags: "@login"
    },

    multiCapabilities: [
        {
            'platform': 'Windows 7',
            'browserName': 'chrome',
            'version': 'latest',
        },


        {
            'platform': 'Windows 7',
            'browserName': 'firefox',
            'version': '60.0'
        },

        {
            'browserName': 'internet explorer',
            'name': 'IE11_Win7',
            'platform': 'Windows 7',
            'version': '11'
        },


        {
            'browserName': 'internet explorer',
            'name': 'IE10_Win7',
            'platform': 'Windows 7',
        },

        {
            'browserName': 'MicrosoftEdge',
            'name': 'IEEdge_LATEST',
            'platform': 'Windows 10',
            'version': 'latest'
        }
    ],


    onPrepare: function () {
        browser.ignoreSynchronization = true;
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;
    }
};
