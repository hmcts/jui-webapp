'use strict';

module.exports = function () {
    const I = this;


    I.fillField("#username", "testccd@gmail.com");
    I.fillField("#password", 'Monda567');
    I.click('Sign in');
    I.seeElement('.error-summary');
    I.see('Incorrect email/password combination', 'h3#failure-error-summary-heading');
    I.see('Please check your email address and password and try again:', '.error-summary > p');
    I.dontSeeElement('button.dropbtn');
    I.dontSee('Case List');


};
