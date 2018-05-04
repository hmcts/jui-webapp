"use strict";

 var loginpage = require('../pages/loginPage');
 var listpage = require('../pages/listPage');
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
    //browser.driver.findElement(by.css('input#username')).sendKeys(valid_username);
    login.username_field.sendKeys(valid_username);
    next();
  });


  Then(/^I enter Password as (.*)$/, function (valid_password, next) {
    browser.waitForAngularEnabled(false);
    // browser.driver.findElement(by.css('input#password')).sendKeys(valid_password);
    login.password_field.sendKeys(valid_password);
    browser.driver.sleep(3000);
    browser.waitForAngular();
    next();
  });


  When(/^I click on Sign in$/, function () {
    browser.waitForAngularEnabled(false);
    // browser.driver.findElement(by.css('input.button')).click();
    login.signin_btn.click();
    browser.waitForAngular();
    browser.driver.sleep(3000);
  });


  Then(/^I should redirect to the list page$/, function (next) {
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

    expect(login.listview_header_text).isDisplayed().to.eventually.be.true.and.notify(next);
    //browser.driver.findElement(by.css('h1.heading-large')).getText();
    expect(login.listview_header_text.getText()).to.eventually.equals('List View').and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();
    next();
  });


  Then(/^I should see error message saying as (.*)$/, function (err_message, next) {
    login.incorrect_login_msg.getText();
    expect(login.incorrect_login_msg.getText()).to.eventually.equals(err_message).and.notify(next);
    next();
  });


  When(/^I click on Sign out$/, function (next) {
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    list.signOut.click();
    browser.driver.sleep(3000);
    next();
  });


});






