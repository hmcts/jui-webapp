'use strict';

var signInPage = require('../../pages/signInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
var {defineSupportCode} = require('cucumber');
const config = require('../../../config/conf.js');

defineSupportCode(function ({Given, When, Then}) {


    Given(/^I navigate to JUI$/, async function () {
       // await browser.get(this.config.serverUrls[this.config.targetEnv]);
        await browser.get(config.config.baseUrl);
        await browser.driver.manage().deleteAllCookies();
        await browser.refresh();
    });

    Then(/^I am logged in as a Judge$/, async function () {
       await signInPage.emailAddress.sendKeys(this.config.username); //replace username and password
        await signInPage.password.sendKeys(this.config.password);
        await  signInPage.signinBtn.click();

    });

    When(/^I am on the dashboard page$/, async function () {
        var dashboard_header_text = dashBoardPage.dashboard_header;
//        await expect(dashboard_header_text).to.be.present;
        await dashBoardPage.table.isDisplayed();
    });


    When(/^one or more cases are displayed$/,  async function () {
       await dashBoardPage.parties.isDisplayed();
        await dashBoardPage.case_number_links.isDisplayed();
        var no_of_cases = dashBoardPage.number_of_rows.length;
        var no_of_case_reference = dashBoardPage.case_number_links.length;
        assert(no_of_cases === no_of_case_reference, 'no table present');
    });


    When(/^all case numbers are hyperlinked$/,  async function () {
        var case_nums = dashBoardPage.case_number_links;
        await case_nums.first().getText().then(async function(text){
            var expectedRefNum = conf.baseUrl + '/viewcase/' + text + '/summary'
            await expect(case_nums.first().getAttribute('href')).to.eventually.equal(expectedRefNum);
        })
    });


    When(/^I select a case reference$/, async function () {
        await dashBoardPage.case_number_links.last().click();
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, async function () {
        var caseSummary_header_text = caseSummaryPage.caseSummary_header_text;
        await expect(caseSummary_header_text.isDisplayed()).to.eventually.be.true;
//        var case_num = caseSummaryPage.selected_case;
//        await expect(case_num.first().isDisplayed()).to.eventually.be.true;
    });


    Then(/^I will see date details for the list of cases displayed$/, async function () {
       // await expect(dashBoardPage.case_reference_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.parties_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.type_header.isDisplayed()).to.eventually.be.true.and;
        await expect(dashBoardPage.case_start_date.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.date_of_last_action.isDisplayed()).to.eventually.be.true;
    });

    When(/^I see Date of latest action by date ascending order$/, async function () {
         await dashBoardPage.last_action_dates.count().then(function(text){
             console.log('Number of Cases: ' + text);
             if (text>1) {
                dashBoardPage.last_action_dates.map(function (elm) {
                    return elm.getText().then(function (text) {
                        return (text);
                    });
                }).then(function (lastActionDates) {
                    var sortedLastActionDates = lastActionDates.sort(function (date1, date2) {
                        return date1 - date2;
                    });
                    expect(lastActionDates).equals(sortedLastActionDates);
                });
            }
         });
     });

});
