const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

chai.use(chaiAsPromised);

exports.config = {
    params: {
        serverUrls: {
            local: 'http://localhost:3000',
            // dev: 'https://forecaster-ui.dev.tmt.informa-labs.com',
            // prod: 'https://forecaster.ovum.com'
        },
        targetEnv: argv.env || 'local',
    },
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    baseUrl: '',

    capabilities: { browserName: 'chrome' },


    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/**/*.feature'],

    // resultJsonOutputFile: "reports/json/protractor_report.json",

    onPrepare() {
        browser.manage().window()
            .maximize();
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
            '../features/step_definitions/**/*.steps.js'
        ],
        tags: ''
    }
};
