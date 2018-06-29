'use strict';

var logInPage = require('../../pages/logInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');

var expect = require('chai').expect;
var assert = require('assert');
var {defineSupportCode} = require('cucumber');
var chai = require('chai');
chai.use(require('chai-smoothie'));


defineSupportCode(function ({Given, When, Then}) {

    Given(/^I am logged in as a Judge$/, async function () {
        await logInPage.email.sendKeys('test@test.com');
        await  logInPage.password.sendKeys('123');
        await  logInPage.signin_btn.click();

    });

    When(/^I am on the dashboard page$/, async function () {
        var dashboard_header_text = dashBoardPage.dashboard_header;
        await expect(dashboard_header_text).to.be.present;
        dashBoardPage.table.isDisplayed();
    });


    When(/^one or more cases are displayed$/, async function () {
        await dashBoardPage.case_number_links.isDisplayed();
        var no_of_cases = dashBoardPage.number_of_rows.length;
        var no_of_case_reference = dashBoardPage.case_number_links.length;
        assert(no_of_cases === no_of_case_reference, 'no table present');
    });


    When(/^all case numbers are hyperlinked$/, async function () {
        var case_nums = dashBoardPage.case_number_links;
        // need to refactor this
        await expect(case_nums.first().getAttribute('href')).to.eventually.equal('http://localhost:3000/viewcase/1530183252195806/summary');
    });


    When(/^I select a case reference$/, async function () {
        await dashBoardPage.case_number_links.first().click();
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, async function () {
        var caseSummary_header_text = caseSummaryPage.caseSummary_header_text;
        await expect(caseSummary_header_text).to.be.present;
        var case_num = caseSummaryPage.selected_case;
        await expect(case_num.first()).to.be.present;


    });

});
