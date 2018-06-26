'use strict';

var logInPage = require("../../pages/logInPage");
//var caseListPage = require("../../pages/caseListPage");
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');

var expect = require('chai').expect;
var {defineSupportCode} = require('cucumber');


defineSupportCode(function ({Given, When, Then}) {

    Given(/^I logged in as a Judge$/, function (next) {
       logInPage.email.sendKeys("juitestuser1@gmail.com");
        browser.driver.sleep(3000);
       logInPage.password.sendKeys('Monday01');
        browser.driver.sleep(8000);
       logInPage.signin_btn.click();
        browser.driver.sleep(8000);
       next();
    });

    When(/^I am on the dashboard page$/, function (next) {

        expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.dashboard_header.getText()).to.eventually.equal('DashBoard').and.notify(next);
        //expect(dashBoardPage.dashboardTableHeader().isDisplayed()).to.eventually.be.true.and.notify(next);

        //expect(dashBoardPage.dashboard_header.getText()).to.eventually.equal('caseList').and.notify(next);
        next();
    });


    When (/^one or more cases are displayed$/, function (next){
        expect(dashBoardPage.list_of_cases.isDisplayed()).to.eventually.be.true.and.notify(next);
        //dashBoardPage.list_of_cases.
    });

    Then (/^I will see a list of all those SSCS cases$/, function(next){

    }


    When(/^all case references are hyperlinked$/, function (next) {
        expect(dashBoardPage.list_of_cases.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.case_link.isDisplayed()).to.eventually.be.true.and.notify(next);
        next();
    });

    When(/^I select a case reference number$/, function (next) {
        dashBoardPage.first_case_reference_link.click();
        next();
    });

    Then(/^I will be redirected to the Case Summary page for that case$/, function (next) {
        expect(caseSummaryPage.caseSummary_header_text.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(caseSummaryPage.caseSummary_header_text.getText()).to.eventually.equal('Summary').and.notify(next);
        next();
    });

    // When(/^one or more cases are displayed$/, function (next) {
    //     expect(dashBoardPage.list_of_cases.isDisplayed()).to.eventually.be.true.and.notify(next);
    // });
    //
    // Then(/^I will see a list of all those SSCS cases$/, function (next) {
    //
    //     next();
    // });
    //
    //
    // // TODO
    // Then(/^I will see date details for the list of cases displayed$/, function (next) {
    //     // Write code here that turns the phrase above into concrete actions
    //     next();
    // });
    //
    // When(/^I see \'Date of latest action\' by date descending order$/, function (next) {
    //     // Write code here that turns the phrase above into concrete actions
    //     next();
    // });


});
