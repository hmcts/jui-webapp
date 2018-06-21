const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

exports.config = {
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    baseUrl: 'https://www-ccd.nonprod.platform.hmcts.net',

    // capabilities: { browserName: 'chrome' },


    capabilities: {
        browserName: 'chrome',
        chromeOptions: { args: ['--proxy-server=proxyout.reform.hmcts.net:8080'] }


    },


    // chrome: {
    //     ignoreHTTPSErrors: true,
    //     args: [
    //         '--no-sandbox',
    //         '--proxy-server=proxyout.reform.hmcts.net:8080'
    //     ]
    // },


    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/*.feature'],

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
        format: ['pretty'],
        require: ['../features/step_definitions/*.js', '../support/*.js'],
        tags: ''
    }
};
