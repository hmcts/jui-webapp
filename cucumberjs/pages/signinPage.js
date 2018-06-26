"use strict";
const conf = require('..\\config\\conf').config;

var signinPage = function() {

    this.emailAddress = $("[id='username']")
    this.password = $("[id='password']")
//    this.emailAddress = element(by.css('#username'));
//    this.password = element(by.css('#password'));
    this.signinBtn = element(by.css('.button'));

    this.givenIAmLoggedIn = function(){
        this.enterUrEmail(conf.email);
        this.enterPassword(conf.password);
        this.clickSignIn();
        };

    this.enterUrEmail = function(email){
        this.emailAddress.sendKeys(email);
    };

    this.enterPassword = function(password){
        this.password.sendKeys(password);
    };

    this.clickSignIn = function(){
        this.signinBtn.click();
    };

    this.waitFor = function(selector) {
      return browser.wait(function () {
        return browser.isElementPresent(by.css(selector));
      }, 50000);
    }

}

module.exports = new signinPage;
