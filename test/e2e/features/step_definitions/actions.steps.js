const {Given, When, Then} = require('cucumber');

Given(/^I click( the)? "([^"]*)"$/, {retry: 15}, async function (ignore, selector) {
    selector = this.getSelector(selector);
    await browser.wait(function() {
        return $(selector).isPresent();
    }, 5000);

    $(selector).click();
});

//Then(/^I click( the)? "([^"]*)"$/, {retry: 15}, async function (ignore, selector) {
//    selector = this.getSelector(selector);
//    await browser.wait(function() {
//        return $(selector).isPresent();
//    }, 5000);
//
//    $(selector).click();
//});
