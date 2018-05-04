"use strict"

function login(){

This.username_field = element(by.css('input#username'));
This.password_field = element(by.css('input#password'));
This.signin_btn = element(by.css('input.button'));
This.listview_header_text = element(by.css('h1.heading-large'));
This.incorrect_login_msg = element(by.css('h3#failure-error-summary-heading'));



}
module.export = new login;
