'use strict';

//var loginPage = require("../../pages/loginPage");
//var caseListPage = require("../../pages/caseListPage");
var dashBoardPage = require('../../pages/dashBoardPage');

var expect = require('chai').expect;
var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {

    Given(/^I am logged in as a Judge$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });

    When(/^I am on the dashboard page$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });

    When(/^all case references are hyperlinked$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });

    When(/^I select a case reference$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });

    Then(/^I will be redirected to the Case Summary page for that case$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });


});
