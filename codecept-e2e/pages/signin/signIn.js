'use strict';

function signIn() {
    const I = this;



  I.see('Sign in');
  I.fillField("#username", "");
  I.fillField("#password", "");
  I.click('Sign in');
  I.wait(50);
  //I.see('Nayab Gul', 'button.dropbtn');
  I.see('Case List', 'h1');
  I.wait(10);
  I.see('Create new case', 'a.button');
  I.click('button.dropbtn');
  //I.wait(10);
  I.see('Sign Out', '#header-wrapper > header > div.dropdown > div > a');
  I.click('Sign Out');

};

module.exports = signIn;
