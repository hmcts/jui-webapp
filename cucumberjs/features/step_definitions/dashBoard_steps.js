'use strict';

//var signInPage = require("../../pages/signInPage");
//var caseListPage = require("../../pages/caseListPage");
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
var signinPage = require('../../pages/signinPage');
var signoutPage = require('../../pages/headerPage');
var EC = protractor.ExpectedConditions;

var expect = require('chai').expect;
var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {

    Given(/^I am logged in as a Judge$/, function (next) {
        signinPage.givenIAmLoggedIn();
        // Write code here that turns the phrase above into concrete actions
        next();
    });

    When(/^I am on the dashboard page$/, function (next) {
        expect(dashBoardPage.verify_dashboard_page().isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true.and.notify(next);
        //expect(dashBoardPage.dashboard_header.getText()).to.eventually.equal('caseList').and.notify(next);
        next();
    });


    When(/^there are no cases listed$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });


    Then(/^I will see a message saying (.*)$/, function (no_cases_message, next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });


    When(/^all case references are hyperlinked$/, function (next) {
        expect(dashBoardPage.list_of_cases.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.case_link.isDisplayed()).to.eventually.be.true.and.notify(next);
        next();
    });

    When(/^I select a case reference number$/, function (next) {
        var option = dashBoardPage.case_link.get(0);
        option.click();
        next();
    });

    Then(/^I will be redirected to the Case Summary page for that case$/, function (next) {
        expect(caseSummaryPage.caseSummary_header_text.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(caseSummaryPage.caseSummary_header_text.getText()).to.eventually.equal('Summary').and.notify(next);
        next();
    });

    When(/^one or more cases are displayed$/, {timeout: -1}, function (next) {
//        browser.waitForAngular();
//        var foo = $("#content > app-search-result > div > div > app-table > div");
//        browser.wait(EC.visibilityOf($("#content > app-search-result > div > div > app-table > div")), 10000);
        expect(dashBoardPage.number_of_rows.isDisplayed()).to.eventually.be.true.and.notify(next);
    });

    Then(/^I will see a list of all those SSCS cases$/, function (next) {

        next();
    });


    // TODO
    Then(/^I will see date details for the list of cases displayed$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });

    When(/^I see \'Date of latest action\' by date descending order$/, function (next) {
        // Write code here that turns the phrase above into concrete actions
        next();
    });


});
