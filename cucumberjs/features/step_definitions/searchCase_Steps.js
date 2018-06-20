'use strict';

const loginPage = require('../../pages/loginPage');
const caseListPage = require('../../pages/caseListPage');
const searchPage = require('../../pages/searchPage');

const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then }) => {
    When(/^I click on search$/, next => {
        expect(caseListPage.search_btn.isDisplayed()).to.eventually.be.true.and.notify(next);
        caseListPage.search_btn.click();
        next();
    });
    When(/^I select case type as "(.*)"$/, (case_type, next) => {
        expect(searchPage.case_type_field.isDisplayed()).to.eventually.be.true.and.notify(next);
        searchPage.case_type_field.click();
        searchPage.case_type_field.sendKeys(case_type);
        browser.driver.sleep(3000);
        next();
    });

    When(/^I enter invalid case number as "(.*)"$/, (case_number, next) => {
        expect(searchPage.case_number_field.isDisplayed()).to.eventually.be.true.and.notify(next);
        searchPage.case_number_field.sendKeys(case_number);
        browser.driver.sleep(3000);
        next();
    });


    When(/^I click on Apply$/, next => {
        searchPage.apply.click();
        browser.driver.sleep(6000);
        next();
    });


    Then(/^I should see message saying "(.*)"$/, (message, next) => {
        expect(searchPage.invalid_search_err.isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(searchPage.invalid_search_err.getText()).to.eventually.equal(message).and.notify(next);
        next();
    });
});
