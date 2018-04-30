"use strict";

var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {


  Given(/^I am on IDAM login page$/, function (next) {
    browser.waitForAngularEnabled(false);
    browser.driver.getCurrentUrl();
    browser.driver.sleep(3000);
    browser.waitForAngular();
    next();

  });


  When(/^I enter Email address as (.*)$/, function (valid_username, next) {
    browser.waitForAngularEnabled(false);
    browser.driver.findElement(by.css('input#username')).sendKeys(valid_username);
    next();
  });


  Then(/^I enter Password as (.*)$/, function (valid_password, next) {
    browser.waitForAngularEnabled(false);
    browser.driver.findElement(by.css('input#password')).sendKeys(valid_password);
    browser.driver.sleep(3000);
    browser.waitForAngular();
    next();
  });


  When(/^I click on Sign in$/, function () {
    browser.waitForAngularEnabled(false);
    browser.driver.findElement(by.css('input.button')).click();
    browser.waitForAngular();
    browser.driver.sleep(3000);
  });


  Then(/^I should see List View$/, function (next) {
    browser.ignoreSynchronization = true;
    // browser.driver.wait(function() {
    //   return browser.driver.getCurrentUrl().then(function(url) {
    //     const regexp = new RegExp(`^${url.replace('/', '\/')}$`);
    //     let test = regexp.test(url);
    //     return test;
    //   });
    // }).then(() => {
    //   browser.waitForAngularEnabled(true);
    //
    //   });
    browser.driver.findElement(by.css('h1.heading-large')).getText();
    expect(browser.driver.findElement(by.css('h1.heading-large')).getText()).to.eventually.equals('List View').and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();
    next();
  });


  Then(/^I should see error message saying as (.*)$/, function (err_message, next) {
    browser.driver.findElement(by.css('h3#failure-error-summary-heading')).getText();
    expect(browser.driver.findElement(by.css('h3#failure-error-summary-heading')).getText()).to.eventually.equals(err_message).and.notify(next);
    next();
  });


  When(/^I click on Sign out$/, function (next) {
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.driver.findElement(by.css('li > a')).click();
    browser.driver.sleep(3000);
    next();
  });


});






