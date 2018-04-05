'use strict';

module.exports = function () {
    const I = this;

    I.fillField("#username", "nybgul@gmail.com");
    I.fillField("#password", 'Monday01');
    I.click('Sign in');
    I.wait(2);
    I.see('Nayab Gul','button.dropbtn');
    I.see('Case List', 'h1');
    I.see('Create new case','a.button');
    I.click('button.dropbtn');
    I.click('Sign Out');

};

