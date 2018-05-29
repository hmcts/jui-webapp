"use strict";

var loginPage = require("../../pages/loginPage");
var caseListPage = require("../../pages/caseListPage");
var expect = require('chai').expect;
var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {


  Given(/^I am on IDAM login page$/, function (next) {
    browser.driver.sleep(3000);
    browser.waitForAngular();
    expect(loginPage.pagetitle.getText()).to.eventually.equal('Sign in').and.notify(next);
    next();
  });


  When(/^I enter email address as (.*)$/, function (email_address, next) {
    browser.driver.sleep(3000);
    browser.waitForAngular();
    loginPage.username.sendKeys(email_address);
    next();
  });

  When(/^I enter password as (.*)$/, function (pwd, next) {
    browser.driver.sleep(3000);
    browser.waitForAngular();
    loginPage.pasword.sendKeys(pwd);
    next();
  });

  When(/^I click on sign in$/, function (next) {
    browser.driver.sleep(3000);
    loginPage.signin.click();
    browser.waitForAngularEnabled(true);
    next();
  });

  Then(/^I will be redirected to caselist$/, function (next) {
    browser.driver.sleep(3000);
    expect(caseListPage.caselist_header.getText()).to.eventually.equal('Case List').and.notify(next);
    next();
  });


});
