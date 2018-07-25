const {Given, When, Then} = require('cucumber');

Given(/^I navigate to "(.*)"/, async function (url) {
    await browser.get(url);
    await browser.driver.manage().deleteAllCookies();
    await browser.refresh();
});

// Given(/^I navigate to JUI$/, async function () {
//     await browser.get(this.config.serverUrls[this.config.targetEnv]);
//     await browser.driver.manage().deleteAllCookies();
//     await browser.refresh();
// });
