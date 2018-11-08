const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

chai.use(chaiAsPromised);

const jenkinsConfig = [
    // {
    //     browserName: 'firefox',
    //     acceptInsecureCerts: true,
    //     'moz:firefoxOptions': { args: [ '--headless' ] }
    // },

    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        nogui: true,
      chromeOptions: { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks' ] }
    }
];

const localConfig = [
    // {
    //     browserName: 'firefox',
    //     acceptInsecureCerts: true,
    //     proxy: {
    //         proxyType: 'manual',
    //         httpProxy: 'proxyout.reform.hmcts.net:8080',
    //         sslProxy: 'proxyout.reform.hmcts.net:8080',
    //         noProxy: 'localhost:3000'
    //     }
    //  },
    {
        browserName: 'chrome',
        acceptInsecureCerts: true,
         chromeOptions: { args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-zygote '] },
        proxy: {
            proxyType: 'manual',
            httpProxy: 'proxyout.reform.hmcts.net:8080',
            sslProxy: 'proxyout.reform.hmcts.net:8080',
            noProxy: 'localhost:3000'
        }
    }
];

const cap = (argv.local) ? localConfig : jenkinsConfig;

const config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // setting protractor to ignore uncaught exceptions to take care by protractor-cucumber-framework
    ignoreUncaughtExceptions : true,

    specs: ['../features/**/*.feature'],
    exclude: ['../features/app/questions.feature'],

    baseUrl: process.env.TEST_URL || 'http://localhost:3000/',
    params: {
        serverUrls: process.env.TEST_URL || 'http://localhost:3000/',
        targetEnv: argv.env || 'local',
        username: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
        fr_judge_username: process.env.FR_EMAIL,
        fr_judge_password: process.env.FR_PASSWORD,
        sscs_username: process.env.SSCS_EMAIL,
        sscs_password: process.env.SSCS_PASSWORD


    },
    directConnect: true,
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 120000,
    allScriptsTimeout: 500000,
    getPageTimeOut : 200000,
    allScriptsTimeout : 500000,
    multiCapabilities: cap,

    onPrepare() {
        browser.waitForAngularEnabled(false);
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;
    },


    cucumberOpts: {
        strict: true,
        format: 'json:reports_json/results.json',
        tags: ['@all'],
        require: [
            '../support/world.js',
            '../support/*.js',
            '../features/step_definitions/**/*.steps.js'
        ]
    },

    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                reportName: 'JUI Functional Tests',
                // openReportInBrowser: true,
                jsonDir: 'reports/tests/functional',
                reportPath: 'reports/tests/functional'
            }
        }
    ]


};


exports.config = config;
