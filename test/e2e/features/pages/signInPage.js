"use strict";

var signinPage = function() {

    this.emailAddress = element(by.css('input#username'));
    this.password = $("[id='password']");
    this.signinTitle = $('.heading-large');
    this.signinBtn = element(by.css('input.button'));

    this.givenIAmLoggedIn = async function(){
        await this.enterUrEmail("");
        await this.enterPassword("");
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

    this.clickSignIn =  function(){
         this.signinBtn.click();
    };

    this.waitFor = function(selector) {
        return browser.wait(function () {
            return browser.isElementPresent(selector);
        }, 50000);
    }


    this.defaultTime = function () {
        this.setDefaultTimeout(60 * 1000);
    };




}

module.exports = new signinPage;
