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
        await expect(dashBoardPage.dashboard_header).to.be.present;
        var dashboard_header = dashBoardPage.dashboard_header;
        expect(dashboard_header.getText()).to.eventually.equal('Dashboard');
    });


    When(/^one or more cases are displayed$/, async function () {
        expect(dashBoardPage.number_of_rows.isPresent()).to.eventually.be.true;
        // var number_of_cases = dashBoardPage.number_of_rows.count();
        // var number_of_case_links = dashBoardPage.case_number_link;
        //expect((number_of_cases.count).to.eventually.equal(number_of_case_links.count);


    });

    When(/^all case references are hyperlinked$/, async function () {
        dashBoardPage.case_number_link.isPresent();
       // dashBoardPage.case_number_link.first().getAttribute('href').isPresent().to.eventually.be.true;
    });


    When(/^I select a case reference$/, async function () {
        await dashBoardPage.select_first_case_number().click();
        browser.driver.sleep(9000);
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, async function () {
        browser.driver.sleep(9000);
        expect(caseSummaryPage.caseSummary_header_text.isDisplayed()).to.eventually.be.true;
        expect(caseSummaryPage.caseSummary_header_text.getText()).to.eventually.equal('Summary');
        expect(caseSummaryPage.caseDetails_header_text.isDisplayed()).to.eventually.be.true;
        expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal('Case Details');
        assert(caseSummaryPage.selected_case.first().getText().value === dashBoardPage.case_number_link.first().getText().value, 'something wrong');


    });

});
