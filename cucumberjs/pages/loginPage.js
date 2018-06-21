'use strict';


function loginPage() {
    this.pagetitle = element(by.css('h1'));
    this.username = element(by.css('input#username'));
    this.pasword = element(by.css('input#password'));
    this.signin = element(by.css('input.button'));
    this.feedback_link = element(by.css('#content > div.phase-banner-beta > p > span > a'));
}

module.exports = new loginPage();
