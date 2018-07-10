'use strict';

var logInPage = require('../../pages/logInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');

var chai = require('chai');
var expect = chai.expect;
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(require('chai-smoothie'));
var assert = require('chai').assert;

var assert = require('assert');
var conf = require('../../config/conf').config;
var {defineSupportCode} = require('cucumber');


defineSupportCode(function ({Given, When, Then}) {

    Given(/^I am logged in as a Judge$/, async function() {
       await logInPage.email.sendKeys('Stuart.Plummer@hmcts.net');
      await logInPage.password.sendKeys('Monday01');
      await logInPage.signin_btn.click();
        browser.driver.sleep(1000);
        browser.waitForAngular();
        });

    When(/^I am on the dashboard page$/, (next) => {
        browser.driver.sleep(1000);
        browser.waitForAngular();
        expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.dashboard_header.getText()).to.eventually.equal('Dashboard').and.notify(next);
        browser.driver.sleep(1000);
        browser.waitForAngular();
        next();
    });


    When(/^one or more cases are displayed$/, (next) => {
        browser.driver.sleep(1000);
        browser.waitForAngular();
        expect(dashBoardPage.table.isDisplayed()).to.eventually.be.true.and.notify(next);
        var num_rows = dashBoardPage.number_of_rows.count();
        var num_case_links = dashBoardPage.case_number_links.count();
        assert.equal(num_rows, num_case_links, 'no table or table?');
        browser.debugger();
        browser.driver.sleep(1000);
        browser.waitForAngular();
        next();

    });


    When(/^all case numbers are hyperlinked$/, (next) => {
        browser.driver.sleep(1000);
        browser.waitForAngular();
        var case_nums = dashBoardPage.case_number_links;
        expect(case_nums.first().getAttribute('href').isPresent()).to.eventually.be.true.and.notify(next);
        var text = dashBoardPage.case_number_links.first().getText();
        debugger;
        expect(case_nums.first().getAttribute('href')).to.eventually.equal(conf.baseUrl + /viewcase/ + text + /summary/).and.notify(next);

        browser.driver.sleep(1000);
        browser.waitForAngular();
        next();
    });


    When(/^I select a case reference$/, (next) => {
        browser.driver.sleep(1000);
        browser.waitForAngular();
        dashBoardPage.case_number_links.first().click();
        browser.driver.sleep(1000);
        browser.waitForAngular();
        next();
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, (next) => {
        browser.driver.sleep(1000);
        browser.waitForAngular();
        var case_summary_header_text = caseSummaryPage.caseDetails_header_text;
        expect(case_summary_header_text.first().isDisplayed()).to.eventually.be.true.and.notify(next);
        browser.driver.sleep(1000);
        browser.waitForAngular();

    });

});
