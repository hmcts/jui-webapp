"use strict";
const search = require("../pages/GoogleSearch");
//const { Given } = require("cucumber");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given, When, Then }) {

Given(/^I am on google page$/, function(test) {
  return expect(browser.getTitle()).to.eventually.equal("Google");
});

});
