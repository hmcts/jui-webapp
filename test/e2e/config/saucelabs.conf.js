const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const tagProcessor = require('../support/tagProcessor');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));



// const jenkinsConfig = [
//
//     {
//         browserName: 'chrome',
//         acceptInsecureCerts: true,
//         nogui: true
//
//         // chromeOptions: { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote '] }
//     }
// ];



const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/**/*.feature'],
    baseUrl: (process.env.TEST_URL || 'http://localhost:3000/').replace('https', 'http'),
    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD

    },
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,



    multiCapabilities: [
        {
            browserName: 'chrome',
            name: 'WIN_CHROME_LATEST',
            platform: 'Windows 10',
            version: 'latest',
            'tunnel-identifier': 'reformtunnel'
                // shardTestFiles: true,
                // maxInstances: 1

        }


    ],


    exclude: [],

    // getPageTimeout: 600000,
    // allScriptsTimeout: 500000,

    // restartBrowserBetweenTests: true,
    // untrackOutstandingTimeouts: true,

    // multiCapabilities: cap,


    cucumberOpts: {
        strict: true,
        format: './saucelab_results.json/json:cb_reports',
        require: ['../support/world.js', '../support/*.js', '../features/step_definitions/**/*.steps.js'],
        tags: ''
    },


    onComplete() {
        const printSessionId = function(jobName) {
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

    useAllAngular2AppRoots: true,

};
config.cucumberOpts.tags = tagProcessor(config, argv);

exports.config = config;
