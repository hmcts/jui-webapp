"use strict";

var signoutPage = function() {

    this.signout = element(by.linkText('Signout'));

    this.clickSignOut = function(){
        this.signout.click();
    }
}

module.exports = new signoutPage;
