var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: "http://localhost:3608",
  capabilities: {
    browserName: "chrome"
  },
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../features/*.feature"],
  resultJsonOutputFile: "reports/json/protractor_report.json",
  onPrepare: function() {
    browser.manage().window().maximize();
    browser.waitForAngularEnabled(false);
    // browser.driver.get(idamUrl);
    // browser.driver.findElement(by.css(''));
    // browser.driver.findElement(by.css(''));

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
    },
  cucumberOpts: {
    strict: true,
    format: ["pretty"],
    require: ["../stepDefinitions/*.js", "../support/*.js"],
    tags: "@login"
  }
};
