"use strict";

var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {

  When(/^I see Upload$/, function (next) {
    browser.waitForAngularEnabled(true);
    expect(browser.driver.findElement(by.css('a.button')).isDisplayed()).to.eventually.be.true.and.notify(next);

  });


  Then(/^I add a file to Upload$/, function (file, next) {

    next();

  });


  When(/^I click on Upload$/, function (btn, next) {
    next();
  });

  Then(/^I should see uploaded file on List View$/, function (next) {
    next();
  });

});
