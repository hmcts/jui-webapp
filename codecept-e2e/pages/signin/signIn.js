'use strict';

function signIn() {
  const I = this;



  //browser.sleep(500);
  browser.ignoreSynchronization = true;
  browser.waitForAngular();
  //browser.sleep(1000);
  //I.wait(10);
  browser.waitForAngularEnabled(false);
  browser.get("https://idam.dev.ccidam.reform.hmcts.net/login?response_type=code&client_id=ccd_gateway&redirect_uri=https%3A%2F%2Fcase-worker-web.dev.ccd.reform.hmcts.net%2Foauth2redirect");


  I.see('Sign in');
  I.fillField("#username", "nybgul@gmail.com");
  I.fillField("#password", 'Monday01');
  I.click('Sign in');
  I.wait(5);
  //I.see('Nayab Gul', 'button.dropbtn');
  I.see('Case List', 'h1');
 // I.wait(10);
  I.see('Create new case', 'a.button');
  I.click('button.dropbtn');
  //I.wait(10);
  I.see('Sign Out', '#header-wrapper > header > div.dropdown > div > a');
  I.click('Sign Out');

};

module.exports = signIn;
