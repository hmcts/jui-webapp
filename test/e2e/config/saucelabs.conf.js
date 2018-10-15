const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const tagProcessor = require('../support/tagProcessor');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));


const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/**/*.feature'],
    baseUrl: (process.env.TEST_URL || 'http://localhost:3000/'),
    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD

    },
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    // allScriptsTimeout: 111000,


    useAllAngular2AppRoots: true,
    multiCapabilities: [
        {
            'browserName': 'chrome',
            'version': 'latest',
            'platform': 'Windows 10',
            'name': 'chrome-tests',
            'tunnel-identifier': 'reformtunnel',
            'extendedDebugging': true,
            'shardTestFiles': true,
            'maxInstances': 2

        }


    ],


    exclude: [],


    cucumberOpts: {
        strict: true,
        format: 'json:cb_reports/saucelab_results.json',
        require: ['../support/world.js', '../support/*.js', '../features/step_definitions/**/*.steps.js'],
        print: function () {
        },
        tags: ''
    },


    onComplete() {
        const printSessionId = function (jobName) {
            browser.getSession()
                .then(session => {

                    console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
                });
        };
        printSessionId('JUI CB Tests');
    },


    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'JUI CrossBrowser Tests',
                jsonDir: './functional-output/crossbrowser/reports',
                reportPath: './functional-output/crossbrowser/reports'


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
