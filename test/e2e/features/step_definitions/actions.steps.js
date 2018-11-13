const {Given, When, Then} = require('cucumber');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../../support/constants');

Given(/^I click( the)? "([^"]*)"$/, {retry: 15}, async function (ignore, selector) {
    selector = this.getSelector(selector);
    await browser.wait(function() {
        return $(selector).isPresent();
    }, LONG_DELAY);

    $(selector).click();
});
