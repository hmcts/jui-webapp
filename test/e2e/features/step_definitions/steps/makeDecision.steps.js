'use strict';
const timelinePage = require('../../pages/timelinePage');
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

});


