'use strict';

const loginPage = require('../../pages/loginPage');
const feedbackPage = require('../../pages/feedbackPage');

const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then }) => {
    When(/^I see feedback link$/, next => {
        browser.waitForAngularEnabled(false);
        browser.driver.sleep(3000);
        browser.waitForAngular();
        expect(loginPage.feedback_link.isDisplayed()).to.eventually.be.true.and.notify(next);
        next();
    });


    When(/^I click on feedback$/, next => {
        loginPage.feedback_link.click();
        next();
    });

    Then(/^I should see header message saying "(.*)"$/, (message, next) => {
        expect(feedbackPage.header_text.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(feedbackPage.header_text.getText()).to.eventually.equal(message).and.notify(next);
        next();
    });


    When(/^I choose a service$/, next => {
        feedbackPage.choose_money_claim.click();
        next();
    });


    Then(/^I enter my feedback$/, next => {
        feedbackPage.fill_in_feeback.sendKeys('test');
        next();
    });

    Then(/^I click submit$/, next => {
        feedbackPage.submit.click();
        next();
    });


    Then(/^I should see a message after feedback saying "(.*)"$/, (message, next) => {
        expect(feedbackPage.message_after_feedback.getText()).to.eventually.equal(message).and.notify(next);
        next();
    });
});
