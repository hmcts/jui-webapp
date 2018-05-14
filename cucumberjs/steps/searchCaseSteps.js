"use strict";

//var loginPage = require("../pages/loginPage");
var caseListPage = require("../pages/caseListPage");
var searchPage = require('../pages/searchPage');

var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {


  When(/^I click on search$/, function (next) {
    browser.waitForAngularEnabled(true);
    browser.driver.sleep(6000);
    browser.waitForAngular();
    caseListPage.search_btn.click();
    next();
  });

  When(/^I enter invalid case number as "(.*)"$/, function (case_number, next) {
    browser.driver.sleep(3000);
    expect(searchPage.case_number_field.isDisplayed()).to.eventually.be.true.and.notify(next);
    searchPage.case_number_field.sendKeys(case_number);
    next();
  });


  When(/^I click on Apply$/, function (next) {
    searchPage.apply.click();
    next();
  });


  Then(/^I should see message saying "(.*)"$/, function (message, next) {
    expect(searchPage.invalid_search_err.isDisplayed()).to.eventually.be.true.and.notify(next);
    expect(searchPage.invalid_search_err.getText()).to.eventually.equal(message).and.notify(next);
    next();
  });

});
