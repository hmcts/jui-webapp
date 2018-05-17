'use strict';

function signIn() {
  const I = this;

  I.see('Sign in');
  I.fillField("#username", "");
  I.fillField("#password", '');
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
