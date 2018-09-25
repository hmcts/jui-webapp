'use strict';


var caseSummaryPage = require('../../pages/caseSummaryPage');
var { defineSupportCode } = require('cucumber');
const config = require('../../../config/conf.js');

const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {

    Then(/^I should see case summary details of that (.*)$/, async function(type) {

        if (type === 'Financial Remedy') {
            await expect(caseSummaryPage.caseDetails_header_text.first()
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.caseDetails_header_text.first()
                .getText())
                .to
                .eventually
                .equal('Case details');
            await expect(caseSummaryPage.casefields.get(0)
                .getText())
                .to
                .eventually
                .equal('Parties');
            await expect(caseSummaryPage.casefields.get(1)
                .getText())
                .to
                .eventually
                .equal('Case type');
            await expect(caseSummaryPage.casefields.get(2)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(2)
                .getText())
                .to
                .eventually
                .equal('Case number');
        }
        else {
            await expect(caseSummaryPage.caseDetails_header_text.first().isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.caseDetails_header_text.first().getText()).to.eventually.equal('Case details');
            await expect(caseSummaryPage.casefields.get(1).isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(0).isDisplayed()).to.eventually.equal('Parties');
            await expect(caseSummaryPage.casefields.get(1).isDisplayed()).to.eventually.equal('Case type');
            await expect(caseSummaryPage.casefields.get(2).isDisplayed()).to.eventually.equal('Benefit type');
            await expect(caseSummaryPage.casefields.get(3).getText()).to.eventually.equal('Case number');
            await expect(caseSummaryPage.casefields.get(4).getText()).to.eventually.equal('GAPS2 Case number');

        }


            });


    Then(/^I should see related cases or panel members details for that(.*)$/, async function(type) {
        if (type === 'PIP')

        {
            await expect(caseSummaryPage.caseDetails_header_text.get(1)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.caseDetails_header_text.get(1)
                .getText())
                .to
                .eventually
                .equal('Panel members');
            await expect(caseSummaryPage.casefields.get(5)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(5)
                .getText())
                .to
                .eventually
                .equal('Judge');
            await expect(caseSummaryPage.casefields.get(6)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(6)
                .getText())
                .to
                .eventually
                .equal('Medical member');
            await expect(caseSummaryPage.casefields.get(7)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(7)
                .getText())
                .to
                .eventually
                .equal('Disability qualified member');

        }




        else


        {
            await expect(caseSummaryPage.caseDetails_header_text.get(1)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.caseDetails_header_text.get(1)
                .getText())
                .to
                .eventually
                .equal('Related cases');

        }


            });


});
