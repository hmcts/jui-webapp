'use strict';

var loginPage = require('../../pages/loginPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var { defineSupportCode } = require('cucumber');

const config = require('../../../config/conf.js');
const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {


    Given(/^I login$/, async function() {
        const username = $(this.getSelector('idam-username'));
        const password = $(this.getSelector('idam-password'));
        const submit = $(this.getSelector('idam-submit'));
        await username.sendKeys(this.config.username);
        await password.sendKeys(this.config.password);
        await submit.click();
        await browser.wait(() => {
            return $(this.getSelector('jui-header'))
                .isPresent();
        }, 5000);
    });


    Given(/^I am logged into JUI web app$/, async function() {
        await loginPage.emailAddress.sendKeys(this.config.username);
        await loginPage.password.sendKeys(this.config.password);
        browser.sleep(5000);
        await loginPage.signinBtn.click();
        browser.sleep(2000);

    });


    When(/^I navigate to JUI Url$/, async function() {
        await browser.get(config.config.baseUrl);
        await browser.driver.manage()
            .deleteAllCookies();
        await browser.refresh();
    });

    Then(/^I should see failure error summary$/, async function() {
        await expect(loginPage.failure_error_heading.isDisplayed()).to.eventually.be.true;
        await expect(loginPage.failure_error_heading.getText())
            .to
            .eventually
            .equal('Incorrect email/password combination');

    });


    Then(/^I am on Idam login page$/, async function() {
        await expect(loginPage.signinTitle.isDisplayed()).to.eventually.be.true;
        await expect(loginPage.signinTitle.getText())
            .to
            .eventually
            .equal('Sign in');
        await expect(loginPage.emailAddress.isDisplayed()).to.eventually.be.true;
        await expect(loginPage.password.isDisplayed()).to.eventually.be.true;


    });


    When(/^I enter an valid email-address and password to login$/, async function() {
        await loginPage.emailAddress.sendKeys(this.config.username);          //replace username and password
        await loginPage.password.sendKeys(this.config.password);
        browser.sleep(3000);
        await loginPage.signinBtn.click();

    });


    When(/^I enter an Invalid email-address and password to login$/, async function() {
        await loginPage.givenIAmUnauthenticatedUser();

    });


    Given(/^I should be redirected to the Idam login page$/, async function() {
        browser.sleep(3000);
        await expect(loginPage.signinTitle.getText())
            .to
            .eventually
            .equal('Sign in');
        browser.sleep(3000);
    });


    Then(/^I select the sign out link$/, async function() {
        browser.sleep(3000);
        await expect(dashBoardPage.sign_out_link.isDisplayed()).to.eventually.be.true;
        browser.sleep(2000);
        await dashBoardPage.sign_out_link.click();
        browser.sleep(3000);
    });


    Then(/^I should be redirected to JUI dashboard page$/, async function() {
        browser.sleep(3000);
        await expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true;
        await dashBoardPage.table.isDisplayed();
        await expect(dashBoardPage.your_cases.getText())
            .to
            .eventually
            .equal('Your cases');
        browser.sleep(3000);

    });

    When(/^I am logged into JUI web app with FR judge details$/, async function () {

    });



});
