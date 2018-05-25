"use strict";

var loginPage = require("../pages/loginPage");
var caseListPage = require("../pages/caseListPage");
var signOutPage = require("../pages/signOutPage");
var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {


  Then(/^I click on Sign Out$/, function(next){
    browser.waitForAngularEnabled(true);
    browser.driver.sleep(3000);
    caseListPage.header_dropdwn.click();
    caseListPage.signout_btn.click();
    next();
  });


  Then(/^I should see a message saying "(.*)"$/, function (message,next) {
    browser.waitForAngularEnabled(true);
    browser.driver.sleep(3000);
    expect(signOutPage.signout_msg.getText()).to.eventually.equal(message).and.notify(next);
  next();
  });




});
