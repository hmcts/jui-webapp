'use strict';


var caseSummaryPage = require('../../pages/caseSummaryPage');
var { defineSupportCode } = require('cucumber');


const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {

    Then(/^I should see case details of that case (.*)$/, async function(type) {

        await expect(caseSummaryPage.caseDetails_header_text.isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal("Case details");

        browser.sleep(3000);

        if (type === "Divorce"){
            await expect(caseSummaryPage.casefields.first().getText()).to.eventually.equal("Case number");
            await expect(caseSummaryPage.casefields.get(1).getText()).to.eventually.equal("Case type");
            await expect(caseSummaryPage.casefields.get(2).isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(2).getText()).to.eventually.equal("Case status");
            await expect(caseSummaryPage.casefields.get(3).getText()).to.eventually.equal("Reason for divorce");

        }
else  {
            await expect(caseSummaryPage.casefields.first().getText()).to.eventually.equal("Parties");
            await expect(caseSummaryPage.casefields.get(1).getText()).to.eventually.equal("Case type");
            await expect(caseSummaryPage.casefields.get(2).isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(2).getText()).to.eventually.equal("Case number");


        }
    });


    Then(/^I should see linked cases or panel members details for that case(.*)$/, async function(type) {
        browser.sleep(3000);
        if (type === "PIP")
        {
            await expect(caseSummaryPage.caseDetails_header_text.isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal("Panel members");


        }
        else
        {
            await expect(caseSummaryPage.representatives_text.isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.representatives_text.getText()).to.eventually.equal("Representatives");
            await expect(caseSummaryPage.linkedcase_text.isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.linkedcase_text.getText()).to.eventually.equal("Linked cases");

        }


    });


});
