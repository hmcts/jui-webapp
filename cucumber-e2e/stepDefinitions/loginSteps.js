"use strict";
//var homePage = require("../pages/homePage");
var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {


  Given(/^I am on IDAM login page$/, function (next) {
    browser.waitForAngularEnabled(false);
    browser.driver.getCurrentUrl();
    browser.driver.sleep(3000);
    browser.waitForAngular();
    next();

  });


  When(/^I enter valid Email address as(.*)$/, function (valid_username, next) {
    browser.waitForAngularEnabled(false);
    browser.driver.findElement(by.css('input#username')).sendKeys(valid_username);
    next();
  });


  Then(/^I enter valid Password as(.*)$/, function(valid_password, next) {
    browser.waitForAngularEnabled(false);
    browser.driver.findElement(by.css('input#password')).sendKeys('');
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
    browser.waitForAngularEnabled(true);
    browser.driver.findElement(by.css('h1.heading-large')).getText();
    browser.driver.sleep(3000);
    browser.waitForAngular();
    next();

  });


  When(/^I see Upload$/, function (next) {
    next();

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






