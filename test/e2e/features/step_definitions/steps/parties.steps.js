'use strict';

var partiesPage = require('../../pages/partiesPage');
var { defineSupportCode } = require('cucumber');


const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {


    Then(/^I can see Petitioner and Respondent tabs$/, async function() {


    });

    When(/^I select Petitioner tab$/, async function() {

    });


    When(/^I select Respondent tab$/, async function() {

    });

    Then(/^I can see (.*), (.*), (.*) , (.*)$/, async function(fullname, Address, phone, email, representative) {

    });


});
