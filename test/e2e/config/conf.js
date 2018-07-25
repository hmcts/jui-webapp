const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const minimist = require('minimist');
const tagProcessor = require('../support/tagProcessor');

const argv = minimist(process.argv.slice(2));

chai.use(chaiAsPromised);

const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/**/*.feature'],

    baseUrl: process.env.TEST_URL || 'http://localhost:3000',
    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000',
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD

    },
    directConnect: true,
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,

    multiCapabilities: [
        // {
        //     browserName: 'firefox',
        //     acceptInsecureCerts: true,
        //     //     // proxy: {
        //     //     //     proxyType: 'manual',
        //     //     //     httpProxy: 'proxyout.reform.hmcts.net:8080',
        //     //     //     sslProxy: 'proxyout.reform.hmcts.net:8080',
        //     //     //     noProxy: 'localhost:3000'
        //     //     // },
        //     'moz:firefoxOptions': { args: [ '--headless' ] }
        // },
        {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            // proxy: {
            //     proxyType: 'manual',
            //     httpProxy: 'proxyout.reform.hmcts.net:8080',
            //     sslProxy: 'proxyout.reform.hmcts.net:8080',
            //     noProxy: 'localhost:3000'
            // }
            chromeOptions: { args: ['--headless'] }
        }
    ],


    // resultJsonOutputFile: "reports/json/protractor_report.json",

    onPrepare() {
        browser.manage().window().maximize();
        browser.waitForAngularEnabled(false);
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;
    },

    cucumberOpts: {
        strict: true,
        format: ['node_modules/cucumber-pretty'],
        require: [
            '../support/world.js',
            '../features/step_definitions/**/*_steps.js'
        ]
    }
};

config.cucumberOpts.tags = tagProcessor(config, argv);

exports.config = config;
