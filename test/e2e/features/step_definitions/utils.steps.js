const {Given} = require('cucumber');

    let index = 0;

    Given(/^I wait (\d+) seconds?$/, async function (seconds) {
        await this.client.sleep(seconds * 1000);
    });

    Given(/^I take a screenshot$/, function () {
        // this.client.saveScreenshot('./test/screenshots/' + index++ + '.png');
    });

    Given(/^I dump the logs$/, function () {
        // const logs = this.client.log('browser');
        // console.log(logs);
    });

    Given(/^I refresh the page$/, async function () {
        await browser.refresh();
    });
