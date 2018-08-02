
const {Given, When, Then} = require('cucumber');
const config = require('../../config/conf.js');

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

When('I navigate to case {string}', async function (url) {
     url = '/viewcase/' + url + '/casefile';
     await browser.get(config.config.baseUrl + url);
});
