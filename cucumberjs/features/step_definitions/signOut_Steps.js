'use strict';

const loginPage = require('../../pages/loginPage');
const caseListPage = require('../../pages/caseListPage');
const signOutPage = require('../../pages/signOutPage');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then }) => {
    Then(/^I click on Sign Out$/, next => {
        caseListPage.header_dropdwn.click();
        caseListPage.signout_btn.click();
        next();
    });


    Then(/^I should be redirect to signin page$/, next => {
        browser.waitForAngularEnabled(false);
        expect(loginPage.pagetitle.getText()).to.eventually.equal('Sign in').and.notify(next);
        next();
    });
});
