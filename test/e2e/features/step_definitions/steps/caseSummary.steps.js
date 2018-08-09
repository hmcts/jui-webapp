'use strict';


var caseSummaryPage = require('../../pages/caseSummaryPage');
var {defineSupportCode} = require('cucumber');
const config = require('../../../config/conf.js');

const EC = protractor.ExpectedConditions;

defineSupportCode(function ({Given, When, Then}) {

    Then(/^I should see case summary details of that case$/, async function () {
        await expect(caseSummaryPage.caseDetails_header_text.first().isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.caseDetails_header_text.first().getText()).to.eventually.equal('Case details');
        await expect(caseSummaryPage.casefields.get(1).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.casefields.get(1).getText()).to.eventually.equal('Case number');
        await expect(caseSummaryPage.casefields.get(2).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.casefields.get(2).getText()).to.eventually.equal('Case type');


    });

    Then(/^I should see panel members details for that case$/, async function () {
        await expect(caseSummaryPage.caseDetails_header_text.get(1).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.caseDetails_header_text.get(1).getText()).to.eventually.equal('Panel members');
        await expect(caseSummaryPage.casefields.get(3).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.casefields.get(3).getText()).to.eventually.equal('Judge');
        await expect(caseSummaryPage.casefields.get(4).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.casefields.get(4).getText()).to.eventually.equal('Medical Member');
        await expect(caseSummaryPage.casefields.get(5).isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.casefields.get(5).getText()).to.eventually.equal('Disability qualified member');


    });


});
