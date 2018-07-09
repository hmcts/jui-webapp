'use strict';

const { defineSupportCode } = require('cucumber');
const conf = require('../../config/conf').config;
var signinPage = require("../../pages/signinPage");
var dashBoardPage = require("../../pages/dashBoardPage");
var headerPage = require("../../pages/headerPage");
var expect = require('chai').expect;

defineSupportCode(({ Given, When, Then }) => {

Given(/^I am logged in"(.*)"$/, function (next){
        signinPage.givenIAmLoggedIn();
        expect(browser.getCurrentUrl()).to.eventually.equal(conf.baseUrl).and.notify(next);
    });

    Given('I am on Jui signin page', async function() {
        await expect(browser.getCurrentUrl()).to.eventually.contain(conf.baseUrl);
        await expect(signinPage.signinTitle.isDisplayed()).to.eventually.be.true;//.and.notify(next);
    });

    Given('I am not authenticated with Idam', async function () {
        await signinPage.givenIAmUnauthenticatedUser();
        await expect(browser.getCurrentUrl()).to.eventually.contain('login?');
    });


    When(/^I enter email address as (.*)$/, async function(email) {
        await signinPage.enterUrEmail(email);
    });

    When(/^I enter password as (.*)$/, async function(password) {
        await signinPage.enterPassword(password);
    });

    When('I click on signin', async function() {
        await signinPage.clickSignIn();
    });

    When ('I try to access a JUI page', async function(){
        await signinPage.clickSignIn();
    });

    Then('I should see dashboard page', async function() {
        await expect(browser.getCurrentUrl()).to.eventually.contain(conf.baseUrl + '/');
        await expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true;//.and.notify(next);
    });

    Then ('I should be redirected to the Idam login page', async function(){
//        await expect(browser.getCurrentUrl()).to.eventually.equal('http://idam-web-public-idam-saat.service.core-compute-saat.internal/login?response_type=code&redirect_uri=https%3a%2f%2fjui-webapp-saat.service.core-compute-saat.internal%2foauth2%2fcallback&client_id=jui_webapp');
        await expect(signinPage.signinTitle.isDisplayed());
    });

     Then('I signout', async function() {
             // Write code here that turns the phrase above into concrete actions
        await headerPage.clickSignOut();
     });
});
