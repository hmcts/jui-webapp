const {Given, When, Then} = require('cucumber');

Given(/^I navigate to JUI$/, function () {
    browser.get(this.config.serverUrls[this.config.targetEnv]);
});

// Given(/^I visit "(.*)"$/, function (url) {
//     this.client.url(url);
// });