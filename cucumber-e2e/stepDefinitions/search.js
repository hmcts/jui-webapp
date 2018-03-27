"use strict";
const search = require("../pages/GoogleSearch");
const { Given } = require("cucumber");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given, Then, When }) {

  Given(/^I am on google page$/, function(text) {
    return expect(browser.get(url).eventually.equals(text)).and.notify(next);
  });

  Then(/^I should see the title as "(.*?)"$/, function(text) {
    expect(pageActions.returnTitle()).to.eventually.equals(text).and.notify(next);
  });

  When (/^I enter "(.*?)"$/, function (text) {
    return googleSearch.searchTextBox.sendKeys(text).and.notify(next);

  });

  Then (/^I click search button$/, function (text) {
    return googleSearch.searchButton.click
  });


});
