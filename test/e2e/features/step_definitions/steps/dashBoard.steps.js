'use strict';

var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
var caseFilePage = require('../../pages/caseFilePage');
var { defineSupportCode } = require('cucumber');

const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {


    When(/^I am on the dashboard page$/, async function() {
        browser.sleep(3000);
        await expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.dashboard_header.getText())
            .to
            .eventually
            .equal('Dashboard');

    });

    When(/^I select a case(.*)$/, async function(type) {
        browser.sleep(3000);
        await dashBoardPage.case_number_links.first()
            .click();
        browser.sleep(5000);

    });


    When(/^one or more cases (.*) are displayed$/, async function(type) {

        var no_of_types = dashBoardPage.type_links.count()
            .then(function(count) {

                console.log('count', +count);
                if (count > 0) {

                    dashBoardPage.case_links.first()
                        .getAttribute('href')
                        .then(function(attr) {
                            console.log('test', attr);
                            var re = new RegExp('(.+)/viewcase/(.+)/summary').compile();
                            expect(attr)
                                .to
                                .match(re);

                        });
                } else {
                    console.log('no case reference links present', +count);
                }

            });
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, async function() {
        browser.sleep(3000);

        await expect(caseSummaryPage.caseSummary_header_text.isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.caseSummary_header_text.getText())
            .to
            .eventually
            .equal('Summary');

        await expect(caseSummaryPage.caseDetails_header_text.first()
            .getText())
            .to
            .eventually
            .equal('Case details');
        await expect(caseSummaryPage.caseDetails_header_text.get(1)
            .getText())
            .to
            .eventually
            .equal('Related cases');


    });


    Then(/^I will see date details for the list of cases displayed$/, async function() {
        await expect(dashBoardPage.case_received_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.date_of_last_action_header.isDisplayed()).to.eventually.be.true;
    });


    When(/^I see Date of latest action by date ascending order$/, async function() {
        await dashBoardPage.last_action_dates.count()
            .then(function(text) {
                console.log('Number of Cases: ' + text);
                if (text > 1) {
                    dashBoardPage.last_action_dates.map(function(elm) {
                        return elm.getText()
                            .then(function(text) {
                                return (text);
                            });
                    })
                        .then(function(lastActionDates) {
                            var sortedLastActionDates = lastActionDates.sort(function(date1, date2) {
                                return date1 - date2;
                            });
                            expect(lastActionDates)
                                .equals(sortedLastActionDates);
                        });
                }
            });
    });


    Then(/^I should see table header columns$/, async function() {
        await expect(dashBoardPage.table.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.table_column_header.isDisplayed()).to.eventually.be.true;

    });


    Then(/^I should see table each column header text as (.*), (.*),(.*), (.*), (.*), (.*)$/, async function() {
        await expect(dashBoardPage.case_number_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.case_number_header.getText())
            .to
            .eventually
            .equal('Case number');

        await expect(dashBoardPage.parties_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.parties_header.getText())
            .to
            .eventually
            .equal('Parties');

        await expect(dashBoardPage.type_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.type_header.getText())
            .to
            .eventually
            .equal('Type');

        await expect(dashBoardPage.decision_needed_on_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.decision_needed_on_header.getText())
            .to
            .eventually
            .equal('Decision needed on');

        await expect(dashBoardPage.case_received_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.case_received_header.getText())
            .to
            .eventually
            .equal('Case received');

        await expect(dashBoardPage.date_of_last_action_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.date_of_last_action_header.getText())
            .to
            .eventually
            .equal('Date of last event');


    });


    When(/^I see (.*) on dashboard$/, async function() {
        await expect(dashBoardPage.draft_consent_order_link.first()
            .isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.draft_consent_order_link.first()
            .getText())
            .to
            .eventually
            .equal('Draft consent order');
    });


    Then(/^I select a (.*) from Decision needed on column$/, async function() {
        await dashBoardPage.draft_consent_order_link.first()
            .click();

    });

    Then(/^I will be redirected to the Case file page for that Financial remedy case$/, async function() {
        await expect(caseFilePage.sub_nav_link.isDisplayed()).to.eventually.be.true;
        await expect(caseFilePage.case_file_header.isDisplayed()).to.eventually.be.true;
        await expect(caseFilePage.case_file_header.getText()).to.eventually.equal("Case file");

    });


});
