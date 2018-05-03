"use strict";
var uploadpage = require("../pages/uploadPage");

var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {

  When(/^I see Upload$/, function (next) {
    browser.waitForAngularEnabled(true);
    expect(browser.driver.findElement(by.css('a.button')).isDisplayed()).to.eventually.be.true.and.notify(next);

  });


  Then(/^I add a file to Upload$/, function (file, next) {

    browser.waitForAngularEnabled(true);
    browser.driver.findElement(By.css('a.button')).click();
    browser.getCurrentUrl().getText();
    browser.waitForAngularEnabled(false);


    next();

  });


  When(/^I click on Upload$/, function (btn, next) {
    browser.waitForAngularEnabled(true);
    next();
  });

  Then(/^I should able to view uploaded file on List View$/, function (next) {
    browser.getCurrentUrl();
    expect(browser.findElement(by(css('table#documentTable > tbody > tr'))).isDisplayed().to.eventually.be.true.and.notify(next));

    next();
  });

});
