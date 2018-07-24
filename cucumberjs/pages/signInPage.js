"use strict";
const conf = require('../config/conf').config;

var signInPage = function() {
    this.email = element(by.css('input#username'));
    this.password = element(by.css('input#password'));
    this.signin = element(by.css('input.button'));
};


module.exports = new signInPage;
