const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

exports.config = {
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    baseUrl: 'https://jui-webapp-saat.service.core-compute-saat.internal',


    // capabilities: {
    //     browserName: 'chrome',
    // },


    /*****
     * to enable proxy
     */
    capabilities: {
        browserName: 'chrome',

        'proxy': {

            'proxyType': 'manual',
            'httpProxy': 'socks5://localhost:9090',
            'sslProxy': 'socks5://localhost:9090'

        }
    },


    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['../features/*.feature'],


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
        tags: '@signin'
    }
};
