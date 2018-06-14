'use strict';


const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then }) => {
    Given('I am on Jui signin page', callback => {
        browser.driver.sleep(3000);
        browser.waitForAngular();
        //expect(loginPage.pagetitle.getText()).to.eventually.equal('Sign in').and.notify(next);
        next();

        callback(null, 'pending');
    });

    When('I enter email address as ""', callback => {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    When('I enter password as ""', callback => {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    When('I click on signin', callback => {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    Then('I should see dashboard page', callback => {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
});
