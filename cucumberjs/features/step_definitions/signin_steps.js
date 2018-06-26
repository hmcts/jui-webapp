'use strict';

const { defineSupportCode } = require('cucumber');
const conf = require('..\\..\\config\\conf').config;
var signinPage = require("..\\..\\pages\\signinPage");
var expect = require('chai').expect;

defineSupportCode(({ Given, When, Then }) => {

Given(/^I am logged in"(.*)"$/, function (next){
        signinPage.givenIAmLoggedIn();
        expect(browser.getCurrentUrl()).to.eventually.equal(conf.baseUrl).and.notify(next);
       });

    Given('I am on Jui signin page', function() {
//        browser.driver.sleep(10000);
//        browser.waitForAngular();
//        callback(null, 'pending');
    });

    Given('I am not authenticated with Idam', function (next) {
        expect(browser.getCurrentUrl()).to.eventually.equal('http://idam-web-public-idam-saat.service.core-compute-saat.internal/login?response_type=code&redirect_uri=https%3a%2f%2fjui-webapp-saat.service.core-compute-saat.internal%2foauth2%2fcallback&client_id=jui_webapp').and.notify(next);
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

    Then('I should see dashboard page', callback => {
        expect(browser.getCurrentUrl()).to.eventually.equal(conf.baseUrl);
//        callback(null, 'pending');
    });

    Then ('I should be redirected to the Idam login page', function(){
        expect(browser.getCurrentUrl()).to.eventually.equal('http://idam-web-public-idam-saat.service.core-compute-saat.internal/login?response_type=code&redirect_uri=https%3a%2f%2fjui-webapp-saat.service.core-compute-saat.internal%2foauth2%2fcallback&client_id=jui_webapp');
    });

});
