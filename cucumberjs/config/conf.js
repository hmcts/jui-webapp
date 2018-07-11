const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

exports.config = {
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    baseUrl: 'http://localhost:3000',
        email: 'test@test.com',
        password: '123',
        fakeEmail: 'test@abctest.com',


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
        keepAlive: false
//        tags: '@signin'
    }
};
