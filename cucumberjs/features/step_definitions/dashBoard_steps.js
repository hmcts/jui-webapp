'use strict';

var signInPage = require('../../pages/signInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');

var expect = require('chai').expect;
var {defineSupportCode} = require('cucumber');


defineSupportCode(function ({Given, When, Then}) {

    Given(/^I am logged in as a Judge$/, function (next) {
        signInPage.givenIAmLoggedIn();
        next();
    });

    When(/^I am on the dashboard page$/, function (next) {
        //dashBoardPage.dashboard_header.is(':visible');
        expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.dashboard_header.getText()).to.eventually.equal('DashBoard').and.notify(next);

        next();
    });


    When(/^one or more cases are displayed$/, function (next) {
        expect(dashBoardPage.number_of_cases.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.number_of_cases.count()).should.eventually.equal();
        // expect(items.count()).toEqual(startCount+1);
        // next();

    });


    When(/^all case references are hyperlinked$/, function (next) {
        expect(dashBoardPage.case_reference.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.case_reference.getAttribute('href')).isDisplayed();
        var hyper_link = dashBoardPage.case_reference;
        expect(hyper_link.getAttribute('href')).toEqual('https://jui-webapp-saat.service.core-compute-saat.internal/viewcase/#{}#/summary');
        expect(hyper_link.getAttribute('href')).toEqual(caseSummaryPage.selected_case);
        next();
    });

    When(/^I select a case reference$/, function (next) {
        dashBoardPage.first_case_reference_link.is(':visible');
        dashBoardPage.first_case_reference_link.click();
        next();
    });

    Then(/^I will be redirected to the Case Summary page for that case$/, function (next) {
        expect(caseSummaryPage.caseSummary_header_text.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(caseSummaryPage.caseSummary_header_text.getText()).to.eventually.equal('Summary').and.notify(next);
        expect(caseSummaryPage.caseDetails_header_text.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal('Case Details').and.notify(next);
        var hyper_link = dashBoardPage.case_reference;
        expect(hyper_link.getAttribute('href')).toEqual('https://jui-webapp-saat.service.core-compute-saat.internal/viewcase/#{}#/summary');
        expect(hyper_link.getAttribute('href')).toEqual(caseSummaryPage.selected_case);
        next();
    });


});
