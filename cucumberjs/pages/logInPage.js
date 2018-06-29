'use strict';

function logInPage() {
    this.email = element(by.css('input#username'));
    this.password = element(by.css('input#password'));
   this.signin_btn = element(by.css('input.button'));


}

module.exports = new logInPage;
