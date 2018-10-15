'use strict';

var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
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


Then(/^I will be redirected to the Case Summary page for that case (.*)$/, async function(type) {
    browser.sleep(3000);
    await expect(caseSummaryPage.caseSummary_header_text.getText()).to.eventually.equal('Summary');

    if (type === 'PIP') {

        await expect(caseSummaryPage.caseDetails_header_text.getText())
            .to
            .eventually
            .equal('Case details');

        browser.sleep(3000);

        await expect(caseSummaryPage.panel_members_text.getText())
            .to
            .eventually
            .equal('Panel members');



    }
    else
    {
        await expect(caseSummaryPage.caseDetails_header_text.getText())
            .to
            .eventually
            .equal('Case details');

        browser.sleep(3000);

        await expect(caseSummaryPage.representatives_text
            .getText())
            .to
            .eventually
            .equal('Representatives');

        browser.sleep(3000);

        await expect(caseSummaryPage.linkedcase_text
            .getText())
            .to
            .eventually
            .equal('Linked cases');

        browser.sleep(3000);
    }







});


Then(/^I will see date details for the list of cases displayed$/, async function() {
    await expect(dashBoardPage.parties_header.isDisplayed()).to.eventually.be.true;
    await expect(dashBoardPage.type_header.isDisplayed()).to.eventually.be.true;
    await expect(dashBoardPage.case_start_date_header.isDisplayed()).to.eventually.be.true;
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

})
;
