'use strict';


var caseSummaryPage = require('../../pages/caseSummaryPage');
var { defineSupportCode } = require('cucumber');
const config = require('../../../config/conf.js');

const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {

    Then(/^I should see case details of that case$/, async function() {

        browser.sleep(3000);
        await expect(caseSummaryPage.caseDetails_header_text.first().isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.caseDetails_header_text.first().getText()).to.eventually.equal("Case details");

        await expect(caseSummaryPage.casefields.first().getText()).to.eventually.equal("Parties");
        await expect(caseSummaryPage.casefields.get(1).getText()).to.eventually.equal("Case type");
        await expect(caseSummaryPage.casefields.get(2).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.casefields.get(2).getText()).to.eventually.equal("Case number");
    });


    Then(/^I should see related cases or panel members details for that case$/, async function() {
        browser.sleep(3000);
        await expect(caseSummaryPage.caseDetails_header_text.get(1).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.caseDetails_header_text.get(1).getText()).to.eventually.equal("Related cases");
        await expect(caseSummaryPage.casefields.get(3).getText()).to.eventually.equal("Divorce");

    });


});
