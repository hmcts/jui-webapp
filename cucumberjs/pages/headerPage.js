"use strict";

var headerPage =  function() {

  this.signout = element(by.linkText('Signout'));

  this.clickSignOut = async function(){
     await this.signout.click();
    }
};

module.exports = new headerPage;
