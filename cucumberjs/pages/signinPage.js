"use strict";
const conf = require('..\\config\\conf').config;

var signinPage = function() {

    this.emailAddress = element(by.css('input#username'));
    this.password = $("[id='password']");
    this.signinTitle = $('.heading-large');
    this.signinBtn = element(by.css('.button'));

    this.givenIAmLoggedIn = async function(){
        await this.enterUrEmail(conf.email);
        await this.enterPassword(conf.password);
        await this.clickSignIn();
    };

    this.givenIAmUnauthenticatedUser= async function(){
//        this.waitFor(this.enterUrEmail);
        await this.enterUrEmail(conf.fakeEmail);
        await this.enterPassword(conf.password);
    }

    this.enterUrEmail = async function(email){
        await this.emailAddress.sendKeys(email);
    };

    this.enterPassword = async function(password){
        await this.password.sendKeys(password);
    };

    this.clickSignIn = async function(){
        await this.signinBtn.click();
    };

    this.waitFor = function(selector) {
      return browser.wait(function () {
        return browser.isElementPresent(selector);
      }, 50000);
    }

}

module.exports = new signinPage;
