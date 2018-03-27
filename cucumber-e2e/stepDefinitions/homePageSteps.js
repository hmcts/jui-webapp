"use strict";
var homePage = require("../pages/homePage");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given, When, Then}) {


  Given('I am on JUI web home page', function () {
    return browser.get('http://localhost:3000');
  });

  Given('I should see HMCTS logo', function (next) {
    expect(homePage.hmctsLogo.isDisplayed()).to.eventually.be.true.and.notify(next);
  });

  Given('I should see {stringInDoubleQuotes} link', function (stringInDoubleQuotes, next) {

    expect(homePage.juiLink.isDisplayed()).to.eventually.be.true.and.notify(next);
    expect(homePage.juiLink.getText()).to.eventually.equals('Judicial UI').and.notify(next);

  });

  Given('I should see {stringInDoubleQuotes}', function (stringInDoubleQuotes, next) {
    expect(homePage.signOutLink.isDisplayed()).to.eventually.be.true.and.notify(next);
    expect(homePage.juiLink.getText()).to.eventually.equals('Sign Out').and.notify(next);
  });


  Given('I should see the page content as {stringInDoubleQuotes}', function (stringInDoubleQuotes, next) {
    expect(homePage.mainContent.isDisplayed()).to.eventually.be.true.and.notify(next);

  });


  Given('I should see the App home page content as {stringInDoubleQuotes}', function (stringInDoubleQuotes, next) {

    expect(homePage.mainContent.getText()).to.eventually.equals('This is a new service – your').and.notify(next);
  });


  Given('I should see Open Government Licence link', function (next) {
    expect(homePage.openGovtLicenceLink.isDisplayed()).to.eventually.be.true.and.notify(next);

  });


  When('I click on Open Government Licence link', function (next) {
   (homePage.openGovtLicenceLink).click();
  next();
  });


  Then('I should be redirected to licence page', function (next) {
    browser.ignoreSynchronization = true;
    expect(homePage.licenceLogoHolderImg.isDisplayed()).to.eventually.be.true.and.notify(next);

  });

});


