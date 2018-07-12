'use strict';

const { defineSupportCode } = require('cucumber');
const conf = require('..\\..\\config\\conf').config;
var signinPage = require("..\\..\\pages\\signinPage");
var dashBoardPage = require("..\\..\\pages\\dashBoardPage");
var headerPage = require("..\\..\\pages\\headerPage");
var expect = require('chai').expect;

defineSupportCode(({ Given, When, Then }) => {

Given(/^I am logged in"(.*)"$/, function (next){
        signinPage.givenIAmLoggedIn();
        expect(browser.getCurrentUrl()).to.eventually.equal(conf.baseUrl).and.notify(next);
       });

    Given('I am on Jui signin page', function(next) {
        expect(browser.getCurrentUrl()).to.eventually.contain(conf.baseUrl);
        expect(signinPage.signinTitle.isDisplayed()).to.eventually.be.true.and.notify(next);
    });

    Given('I am not authenticated with Idam', function (next) {
        signinPage.givenIAmUnauthenticatedUser();
        expect(browser.getCurrentUrl()).to.eventually.contain('login?').and.notify(next);
    });


    When(/^I enter email address as (.*)$/, function(email, next) {
        signinPage.enterUrEmail(email);
        next();
    });

    When(/^I enter password as (.*)$/, function(password, next) {
        signinPage.enterPassword(password);
        next();
    });

    When('I click on signin', function(next) {
        signinPage.clickSignIn();
        next();
    });

    When ('I try to access a JUI page', function(next){
        signinPage.enterUrEmail(conf.fakeEmail);
        next();
    });

    Then('I should see dashboard page', function(next) {
        expect(browser.getCurrentUrl()).to.eventually.equals(conf.baseUrl + '/').and.notify(next);
        expect(dashBoardPage.verify_dashboard_page().isDisplayed()).to.eventually.be.true.and.notify(next);
        expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true.and.notify(next);
        next();

    });

    Then ('I should be redirected to the Idam login page', function(){
        expect(browser.getCurrentUrl()).to.eventually.equal('http://idam-web-public-idam-saat.service.core-compute-saat.internal/login?response_type=code&redirect_uri=https%3a%2f%2fjui-webapp-saat.service.core-compute-saat.internal%2foauth2%2fcallback&client_id=jui_webapp');
    });

     Then('I signout', function (next) {
             // Write code here that turns the phrase above into concrete actions
             headerPage.clickSignOut();
             next();
           });

});
