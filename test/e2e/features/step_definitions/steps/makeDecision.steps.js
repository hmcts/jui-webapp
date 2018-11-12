'use strict';
const timelinePage = require('../../pages/timelinePage');
const makeDecisionPage = require('../../pages/makeDecisionPage');
const {defineSupportCode} = require('cucumber');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../../../support/constants');
const EC = protractor.ExpectedConditions;

defineSupportCode(function ({Given, When, Then}) {


    Then(/^click on Back to Dashboard takes me to Dashboard Page$/, async function () {
        browser.sleep(MID_DELAY);
        await timelinePage.back_to_dashboard_link.click();
        await expect(timelinePage.back_to_dashboard.isDisplayed()).to.eventually.be.true;
    });

    When(/^I submit the Decision should show Decision confirmation$/, async function () {
        browser.sleep(MID_DELAY);
        await timelinePage.button_continue.click();
        browser.sleep(MID_DELAY);
        await timelinePage.decision_confirmed.getText().then(function (text) {
            console.log(text);
            expect(text).equal('Decision confirmed');
        });
    });

    Then(/^I click the Make Decision button$/,  async function () {
        browser.sleep(MID_DELAY);
        var loginButton = timelinePage.make_decision;
        await browser.wait(EC.elementToBeClickable(loginButton), MID_DELAY);
        await loginButton.click();
    });

    Then(/^I select Don't Approve and click continue$/, async function () {
        browser.sleep(MID_DELAY);
        await timelinePage.draft_button.click();
        browser.sleep(LONG_DELAY);
        await timelinePage.button_continue.click();
        browser.sleep(MID_DELAY);
        await timelinePage.annotate_continue.click();
        browser.sleep(MID_DELAY);
        await timelinePage.button_continue.click();
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
       await expect(makeDecisionPage.draft_consent_order_text.isDisplayed()).to.be.eventually.be.true;
       await expect(makeDecisionPage.draft_consent_order_text.getText()).to.be.eventually.equal('Do you want to approve the draft consent order?');

    });


    When(/^I click on "Yes" option$/, async function () {
        await makeDecisionPage.yes_btn.click();


    });

    Then(/^ I click on Continue$/, async function () {
        await makeDecisionPage.continue_btn.click();


    });

    Then(/^I enter notes for court administration$/, async function () {
        await makeDecisionPage.textarea.send_keys('test draft consent order');

    });

    When(/^I click on Continue$/, async function (){
    await makeDecisionPage.continue_btn.click();

    });

    Then(/^I am on check your decision page$/, async function () {
        await expect(makeDecisionPage.check_decision_header.isDisplayed()).to.be.eventually.be.true;
        await expect(makeDecisionPage.check_decision_header.getText()).to.be.eventually.equal('Check your decision');

    });

});


