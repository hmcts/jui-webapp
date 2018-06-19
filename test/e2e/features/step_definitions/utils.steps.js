const {Given} = require('cucumber');

    let index = 0;

    Given(/^I wait (\d+) seconds?$/, function (seconds) {
        return this.client.pause(seconds * 1000);
    });

    Given(/^I take a screenshot$/, function () {
        // this.client.saveScreenshot('./test/screenshots/' + index++ + '.png');
    });

    Given(/^I dump the logs$/, function () {
        // const logs = this.client.log('browser');
        // console.log(logs);
    });

    Given(/^I refresh the page$/, function () {
        // this.client.refresh();
    });
