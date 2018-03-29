"use strict";
var homePage = require("../pages/homePage");
var {defineSupportCode} = require("cucumber");

defineSupportCode(function ({Given, When, Then}) {


  Given('I am on JUI web home page', function (next) {
    browser.ignoreSynchronization = false;
    expect(browser.getCurrentUrl()).to.eventually.equals('http://localhost:3000/').and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();
  });


  Given('I should see HMCTS logo', function (next) {
    browser.ignoreSynchronization = false;
    expect(homePage.hmctsLogo.isDisplayed()).to.eventually.be.true.and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();
  });


  Given('I should see {stringInDoubleQuotes} link', function (stringInDoubleQuotes, next) {
    browser.ignoreSynchronization = false;
    expect(homePage.juiLink.isDisplayed()).to.eventually.be.true.and.notify(next);
    expect(homePage.juiLink.getText()).to.eventually.equals('Judicial UI').and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();

  });

  Given('I should see {stringInDoubleQuotes}', function (stringInDoubleQuotes, next) {
    browser.ignoreSynchronization = false;
    expect(homePage.signOutLink.isDisplayed()).to.eventually.be.true.and.notify(next);
    expect(homePage.juiLink.getText()).to.eventually.equals('Sign Out').and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();

  });


  Given('I should see the phase tag as {stringInDoubleQuotes}', function (stringInDoubleQuotes, next) {
    browser.ignoreSynchronization = false;
    expect(homePage.phaseTag.isDisplayed()).to.eventually.be.true.and.notify(next);
    expect(homePage.phaseTag.getText()).to.eventually.equals('ALPHA').and.notify(next);
    browser.waitForAngular();

  });


  Given('I should see the App home page content as {stringInDoubleQuotes}', function (stringInDoubleQuotes, next) {
    browser.ignoreSynchronization = false;
    expect(homePage.content.getText()).to.eventually.equals('home works!').and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();
  });


  Given('I should see Open Government Licence link', function (next) {
    browser.ignoreSynchronization = false;
    expect(homePage.openGovtLicenceLink.isDisplayed()).to.eventually.be.true.and.notify(next);
    browser.driver.sleep(3000);
    browser.waitForAngular();

  });


  When('I click on Open Government Licence link', function () {
    browser.ignoreSynchronization = false;
    (homePage.openGovtLicenceLink).click();
    browser.driver.sleep(3000);
    browser.waitForAngular();
  });


  Then('I should be redirected to licence page', function (next) {
    browser.ignoreSynchronization = false;
    expect(homePage.licenceLogoHolderImg.isDisplayed()).to.eventually.be.true.and.notify(next);
    browser.waitForAngular();
  });

});


