"use strict";

var headerPage = function() {

    this.signout = element(by.linkText('Signout'));

    this.clickSignOut = function(){
        this.signout.click();
    }
}

module.exports = new headerPage;
