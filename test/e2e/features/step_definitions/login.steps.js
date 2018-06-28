const {Given, When, Then} = require('cucumber');


Given(/^I login$/, async function () {
    const username = $(this.getSelector('idam-username'));
    const password = $(this.getSelector('idam-password'));
    const submit = $(this.getSelector('idam-submit'));
    await username.sendKeys(this.config.username);
    await password.sendKeys(this.config.password);
    await submit.click();
    await browser.wait(() => {
        return $(this.getSelector('jui-header')).isPresent();
    }, 5000);
});