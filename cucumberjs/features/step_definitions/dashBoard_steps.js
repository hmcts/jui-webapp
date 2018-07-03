'use strict';

var logInPage = require('../../pages/logInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');

var expect = require('chai').expect;
var assert = require('assert');
var conf = require("../../config/conf").config;
var {defineSupportCode} = require('cucumber');
var chai = require('chai');
chai.use(require('chai-smoothie'));


defineSupportCode(function ({Given, When, Then}) {

    Given(/^I am logged in as a Judge$/, async function () {
        await logInPage.email.sendKeys('test@test.com');
        await logInPage.password.sendKeys('123');
        await logInPage.signin_btn.click();

    });

    When(/^I am on the dashboard page$/, async function () {
        var dashboard_header_text = dashBoardPage.dashboard_header;
        await expect(dashboard_header_text).to.be.present;
    });


    When(/^one or more cases are displayed$/, async function () {
        await dashBoardPage.table.isPresent();
        var num_cases = dashBoardPage.case_number_links.count().then(function (rowCount) {
            console.log('Count:' + rowCount);
        });


    });


    When(/^all case numbers are hyperlinked$/, async function ( ) {
        var case_nums = dashBoardPage.case_number_links;
        //var first_case_num = '\^(?:[1-9]\d*|\d)\$';
        case_nums.getAttribute('href').isPresent();
        await expect(case_nums.first().getAttribute('href')).to.eventually.equal(`${conf.baseUrl}/viewcase/${first_case_num}/summary/`);
    });



    When(/^I select a case reference$/, async function () {
        dashBoardPage.case_number_links.first().click();
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, async function () {
        var caseSummary_header_text = caseSummaryPage.caseSummary_header_text;
        await expect(caseSummary_header_text).to.be.present;


    });

});
