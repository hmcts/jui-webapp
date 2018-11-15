'use strict';
const timelinePage = require('../../pages/timelinePage');
const makeDecisionPage = require('../../pages/makeDecisionPage');
const {defineSupportCode} = require('cucumber');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../../../support/constants');
const EC = protractor.ExpectedConditions;

defineSupportCode(function ({Given, When, Then}) {


    Then(/^I click on Make decision button$/, async function () {
        browser.sleep(MID_DELAY);
         await browser.wait(EC.elementToBeClickable(timelinePage.make_decision.first()), MID_DELAY);
         await timelinePage.make_decision.first().click();
    });


    Then(/^I click the Make Decision button$/,  async function () {
        browser.sleep(MID_DELAY);
        await browser.wait(EC.elementToBeClickable(timelinePage.make_decision.first()), MID_DELAY);
        await timelinePage.make_decision.first().click();
        browser.sleep(SHORT_DELAY);
    });

    Then(/^I select Don't Approve and click continue$/, async function () {
        browser.sleep(MID_DELAY);
        await timelinePage.draft_button.click();
        browser.sleep(LONG_DELAY);
        await timelinePage.button_continue.click();
        browser.sleep(LONG_DELAY);
        await timelinePage.annotate_continue.click();
        browser.sleep(MID_DELAY);
        await timelinePage.button_continue.click();
        browser.sleep(MID_DELAY);
    });

    Then(/^I verify the Check Decision page$/, async function () {

        browser.sleep(MID_DELAY);
        await timelinePage.button_continue.click();

        browser.sleep(MID_DELAY);
        await timelinePage.check_decision.getText().then(function (text) {
                console.log(text);
                expect(text).equal('Check your decision');
            });
    });


    Then(/^I see approve the draft consent order option$/, async function () {
        browser.sleep(MID_DELAY);
       await expect(makeDecisionPage.draft_consent_order_text.isDisplayed()).to.be.eventually.be.true;
        browser.sleep(MID_DELAY);
       await expect(makeDecisionPage.draft_consent_order_text.getText()).to.be.eventually.equal('Do you want to approve the draft consent order?');

    });


    When(/^I click on "Yes" option$/, async function () {
        browser.sleep(SHORT_DELAY);
        await makeDecisionPage.yes_btn.click();


    });

    Then(/^ I click on Continue$/, async function () {
        browser.sleep(SHORT_DELAY);
        await makeDecisionPage.continue_btn.click();


    });

    Then(/^I enter notes for court administration$/, async function () {
        browser.sleep(SHORT_DELAY);
        await makeDecisionPage.textarea.clear();
        await makeDecisionPage.textarea.sendKeys('test draft consent order');

    });

    When(/^I click on Continue$/, async function (){
        browser.sleep(SHORT_DELAY);
    await makeDecisionPage.continue_btn.click();

    });

    Then(/^I am on check your decision page$/, async function () {
        browser.sleep(SHORT_DELAY);
        await expect(makeDecisionPage.check_decision_header.isDisplayed()).to.be.eventually.be.true;
        await expect(makeDecisionPage.check_decision_header.getText()).to.be.eventually.equal('Check your decision');

    });

});


