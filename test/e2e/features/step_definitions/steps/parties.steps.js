'use strict';

const partiesPage = require('../../pages/partiesPage');
const { defineSupportCode } = require('cucumber');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../../../support/constants');


const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {


    Then(/^I can see that case (.*) tab component$/, async function(type) {
        if (type === 'Financial remedy'){


        }
        await expect(partiesPage.parties_tabs.first().getText()).to.eventually.equal("Petitioner");
        await expect(partiesPage.parties_tabs.get(1).getText()).to.eventually.equal("Respondent");


    });

    When(/^I select Petitioner tab$/, async function() {
        await partiesPage.parties_tabs.first().click();
        browser.sleep(SHORT_DELAY);

    });


    When(/^I select Respondent tab$/, async function() {

        await partiesPage.parties_tabs.get(1).click();
        browser.sleep(SHORT_DELAY);

    });

    Then(/^I can see (.*),(.*),(.*),(.*),(.*)$/, async function(fullname, Address, phone, email, representative) {
        await expect(partiesPage.petitioner_details.first().getText()).to.eventually.equal(fullname);
        await expect(partiesPage.petitioner_details.get(2).getText()).to.eventually.equal(Address);
        await expect(partiesPage.petitioner_details.get(4).getText()).to.eventually.equal(phone);
        await expect(partiesPage.petitioner_details.get(6).getText()).to.eventually.equal(email);
        await expect(partiesPage.petitioner_details.get(8).getText()).to.eventually.equal(representative);



    });


});
