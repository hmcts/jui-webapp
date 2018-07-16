'use strict';

var signInPage = require('../../pages/signInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
const conf = require('../../config/conf').config;

var expect = require('chai').expect;
var assert = require('assert');
var assert = require('assert').strict;
var {defineSupportCode} = require('cucumber');
var chai = require('chai');
chai.use(require('chai-smoothie'));


defineSupportCode(function ({Given, When, Then}) {


    Given(/^I am logged in as a Judge$/, function (next) {
        signInPage.email.sendKeys('stuart.plummer@hmcts.net');
        signInPage.password.sendKeys('Monday01');
        signInPage.signin.click();
        next();

    });

    When(/^I am on the dashboard page$/, function (next) {
        expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.true.and.notify(next);
        expect(dashBoardPage.table.isDisplayed()).to.eventually.true.and.notify(next);
        next();
    });


    When(/^one or more cases are displayed$/, function (next) {
        expect(dashBoardPage.case_number_links.isDisplayed()).to.eventually.true.and.notify(next);
        var no_of_cases = dashBoardPage.number_of_rows;
        var no_of_case_reference = dashBoardPage.case_number_links;
        expect(no_of_cases.count()).to.eventually.equal(no_of_case_reference.count());
        next();
    });


    When(/^all case numbers are hyperlinked$/, function (next) {      //ignore for now due to test data
        var case_nums = dashBoardPage.case_number_links;
        var text = case_nums.get(10).getText().then(function (text) {
            console.log(text);
        });
        expect(case_nums.get(10).getAttribute('href')).to.eventually.equal(conf.baseUrl + '/viewcase/' + text + '/summary').and.notify(next);
        next();
    });


    When(/^I select a case reference$/, function () {
        var case_link = dashBoardPage.case_number_links;
        case_link.get(10).click();
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, function (next) {
        var caseSummary_header_text = caseSummaryPage.caseSummary_header_text;
        expect(caseSummary_header_text.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(caseSummary_header_text.getText()).to.eventually.equal('Summary');
        next();

    });

});

