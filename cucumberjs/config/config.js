var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  baseUrl:"https://case-worker-web.dev.ccd.reform.hmcts.net/",

  capabilities: {
    browserName: "chrome"
  },


  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../features/*.feature"],

  //resultJsonOutputFile: "reports/json/protractor_report.json",

  onPrepare: function () {
    browser.manage().window().maximize();
    browser.waitForAngularEnabled(false);
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
  },


  cucumberOpts: {
    strict: true,
    format: ["pretty"],
    require: ["../steps/*.js", "../support/*.js"],
    tags: "@search"
  }
};
