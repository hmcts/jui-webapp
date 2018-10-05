const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const tagProcessor = require('../support/tagProcessor');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    // specs: ['../features/**/*.feature'],
    suites: {
        e2e: `../features/**/*.feature`
    },

    baseUrl: process.env.TEST_URL || 'http://localhost:3000/',
    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD

    },

    useAllAngular2AppRoots: true,

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,


    multiCapabilities: [
        {
            browserName: 'chrome',
            name: 'WIN_CHROME_LATEST',
            platform: 'Windows 10',
            version: 'latest',
            'tunnel-identifier': 'reformtunnel'
        },

        {
            browserName: 'chrome',
            name: 'MAC_CHROME_LATEST',
            platform: 'macOS 10.13',
            version: 'latest',
            'tunnel-identifier': 'reformtunnel'
        }


        // {
        //     browserName: 'firefox',
        //     name: 'WIN_FIREFOX_LATEST',
        //     platform: 'Windows 10',
        //     version: 'latest',
        //     'tunnel-identifier': 'saucelabs',
        //     shardTestFiles: true,
        //     maxInstances: 1
        //
        // },
        //
        // {
        //     browserName: 'firefox',
        //     name: 'MAC_FIREFOX_LATEST',
        //     platform: 'macOS 10.13',
        //     version: 'latest',
        //     'tunnel-identifier': 'saucelabs',
        //     shardTestFiles: true,
        //     maxInstances: 1
        // }


    ],


    exclude: [],

    // getPageTimeout: 600000,
    // allScriptsTimeout: 500000,

    // restartBrowserBetweenTests: true,
    // untrackOutstandingTimeouts: true,


    cucumberOpts: {
        strict: true,
        format: 'json:cb_reports/saucelab_results.json',
        require: ['../support/world.js', '../support/*.js', '../features/step_definitions/**/*.steps.js'],
        tags: ''
    },


    onComplete() {
        const printSessionId = function(jobName) {
            browser.getSession()
                .then(session => {
                    console.log(`SauceOnDemandSessionID=${session.getId()} job-name=${jobName}`);
                });
        };
        printSessionId('Insert the Job Name');
    },


    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'JUI CrossBrowser Tests',
                jsonDir: 'reports/crossbrowser/functional-output',
                reportPath: 'reports/crossbrowser/functional-output'


            }
        }
    ],


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
