const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

exports.config = {
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    baseUrl: 'http://localhost:3000', //'https://jui-webapp-saat.service.core-compute-saat.internal',//'http://localhost:3000/app/signin'
        email: 'test@test.com', //'juitestuser1@gmail.com',
        password: '123', //'Monday01',
        fakeEmail: 'test@abctest.com',


    /*****
         * to enable proxy
         */
        // capabilities: {
        //     browserName: 'chrome',
        //
        //     'proxy': {
        //
        //         'proxyType': 'manual',
        //         'httpProxy': 'proxyout.reform.hmcts.net:8080',  //'socks5://localhost:9090',
        //         'sslProxy' : 'proxyout.reform.hmcts.net:8080',  //'socks5://localhost:9090',
        //
        //     }
        // },



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
        keepAlive: false,
        tags: '@wip'
    }
};
