'use strict';

const loginPage = require('../../pages/loginPage');
const caseListPage = require('../../pages/caseListPage');
const expect = require('chai').expect;
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then }) => {
    Given(/^I am on IDAM login page$/, next => {
        browser.driver.sleep(3000);
        browser.waitForAngular();
        expect(loginPage.pagetitle.getText()).to.eventually.equal('Sign in').and.notify(next);
        next();
    });


    When(/^I enter email address as (.*)$/, (email_address, next) => {
        browser.driver.sleep(3000);
        browser.waitForAngular();
        loginPage.username.sendKeys(email_address);
        next();
    });

    When(/^I enter password as (.*)$/, (pwd, next) => {
        browser.driver.sleep(3000);
        browser.waitForAngular();
        loginPage.pasword.sendKeys(pwd);
        next();
    });

    When(/^I click on sign in$/, next => {
        browser.driver.sleep(3000);
        loginPage.signin.click();
        browser.waitForAngularEnabled(true);
        next();
    });

    Then(/^I will be redirected to caselist$/, next => {
        browser.driver.sleep(3000);
        expect(caseListPage.caselist_header.getText()).to.eventually.equal('Case List').and.notify(next);
        next();
    });
});
