"use strict"

var loginPage = require("../../pages/loginPage");
var feedbackPage = require("../../pages/feedbackPage");

var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {


  When(/^I see feedback link$/, function (next) {
    browser.waitForAngularEnabled(false);
    browser.driver.sleep(3000);
    browser.waitForAngular();
    expect(loginPage.feedback_link.isDisplayed()).to.eventually.be.true.and.notify(next);
    next();
  });


  When(/^I click on feedback$/, function (next) {
    loginPage.feedback_link.click();
    next();
  });

  Then(/^I should see header message saying "(.*)"$/, function (message, next) {
    expect(feedbackPage.header_text.isDisplayed()).to.eventually.be.true.and.notify(next);
    expect(feedbackPage.header_text.getText()).to.eventually.equal(message).and.notify(next);
    next();
  });


  When(/^I choose a service$/, function (next) {
    feedbackPage.choose_money_claim.click();
    next();
  });


  Then(/^I enter my feedback$/, function (next) {
    feedbackPage.fill_in_feeback.sendKeys('test');
    next();
  });

  Then(/^I click submit$/, function (next) {
    feedbackPage.submit.click();
    next();
  });


  Then(/^I should see a message after feedback saying "(.*)"$/, function (message, next) {
    expect(feedbackPage.message_after_feedback.getText()).to.eventually.equal(message).and.notify(next);
    next();
  });


});
