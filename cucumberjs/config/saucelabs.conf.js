var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


exports.config = {
  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true,

  /* SAUCELABS CONFIG */
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  baseUrl: '',

  exclude: [],

  getPageTimeout: 60000,
  allScriptsTimeout: 500000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: ["../features/*.feature"],

  cucumberOpts: {
    require: ["../steps/*.js", "../support/*.js"],
    format: ["pretty"],
    //tags: " "
  },

  multiCapabilities: [
    {
      'platform': 'Windows 7',
      'browserName': 'chrome',
      'version': 'latest',
    },


     {
      'platform': 'Windows 7',
      'browserName': 'firefox',
      'version': '60.0'
    }

  ],


  onPrepare: function () {
    browser.ignoreSynchronization = true;
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
  }
};
