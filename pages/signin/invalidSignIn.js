'use strict';

function invalidSignIn() {
    const I = this;

  browser.waitForAngularEnabled(false);
  browser.get("https://idam.dev.ccidam.reform.hmcts.net/login?response_type=code&client_id=ccd_gateway&redirect_uri=https%3A%2F%2Fcase-worker-web.dev.ccd.reform.hmcts.net%2Foauth2redirect");
  I.see('Sign in');
    I.fillField("#username", "testccd@gmail.com");
    I.fillField("#password", 'Monda567');
    I.click('Sign in');
    I.seeElement('.error-summary');
    I.see('Incorrect email/password combination', 'h3#failure-error-summary-heading');
    I.see('Please check your email address and password and try again:', '.error-summary > p');
    I.dontSeeElement('button.dropbtn');
    I.dontSee('Case List');


};

module.exports = invalidSignIn;
