'use strict';

 function signIn() {
  const I = this;



  browser.waitForAngularEnabled(false);
  browser.get("https://idam.dev.ccidam.reform.hmcts.net/login?response_type=code&client_id=ccd_gateway&redirect_uri=https%3A%2F%2Fcase-worker-web.dev.ccd.reform.hmcts.net%2Foauth2redirect");
  I.see('Sign in');
  I.fillField("#username", "nybgul@gmail.com");
  I.fillField("#password", 'Monday01');
  I.click('Sign in');
  I.wait(1);
  I.see('', 'button.dropbtn');
  I.see('Case List', 'h1');
  I.see('Create new case', 'a.button');
  I.click('button.dropbtn');
  I.see('Sign Out');
  I.click('Sign Out');

};

module.exports = signIn;
