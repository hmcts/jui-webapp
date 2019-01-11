'use strict';

const caseSummaryPage = require('../../pages/caseSummaryPage');
const { defineSupportCode } = require('cucumber');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../../../support/constants');


const EC = protractor.ExpectedConditions;

defineSupportCode(function({ Given, When, Then }) {

    Then(/^I should see case details of that case (.*)$/, async function(type) {

        await expect(caseSummaryPage.caseDetails_header_text.isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal("Case details");

        browser.sleep(SHORT_DELAY);

        if (type === 'Divorce') {
            await expect(caseSummaryPage.casefields.first()
                .getText())
                .to
                .eventually
                .equal('Case number');
            await expect(caseSummaryPage.casefields.get(1)
                .getText())
                .to
                .eventually
                .equal('Case type');
            await expect(caseSummaryPage.casefields.get(2)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(2)
                .getText())
                .to
                .eventually
                .equal('Case status');
            await expect(caseSummaryPage.casefields.get(3)
                .getText())
                .to
                .eventually
                .equal('Reason for divorce');

        }
        else {
            await expect(caseSummaryPage.casefields.first()
                .getText())
                .to
                .eventually
                .equal('Parties');
            await expect(caseSummaryPage.casefields.get(1)
                .getText())
                .to
                .eventually
                .equal('Case type');
            await expect(caseSummaryPage.casefields.get(2)
                .isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.casefields.get(2)
                .getText())
                .to
                .eventually
                .equal('Case number');


        }
    });


    Then(/^I should see linked cases or panel members details for that case(.*)$/, async function(type) {
        browser.sleep(SHORT_DELAY);
        if (type === 'PIP') {
            await expect(caseSummaryPage.caseDetails_header_text.isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal('Case details');
            await expect(caseSummaryPage.panel_members_text.getText()).to.eventually.equal('Panel members');
        } else if (type === 'Divorce') {
            await expect(caseSummaryPage.representatives_text.isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal('Case details');
            await expect(caseSummaryPage.representatives_text.getText()).to.eventually.equal('Representatives');
            await expect(caseSummaryPage.linkedcase_text.isDisplayed()).to.eventually.be.true;
            await expect(caseSummaryPage.linkedcase_text.getText()).to.eventually.equal('Linked cases');
        } else if (type === 'Financial Remedy') {
            await expect(caseSummaryPage.caseDetails_header_text.getText()).to.eventually.equal('Case details');
            await expect(caseSummaryPage.related_cases_text.getText()).to.eventually.equal('Related cases');
        } else {

        }
    });

    Then(/^I should see header logo text as (.*)$/, async function(jui_case_manager_logo_text) {
        await expect(caseSummaryPage.judicial_case_manager_link.isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.judicial_case_manager_link.getText())
            .to
            .eventually
            .equal(jui_case_manager_logo_text);

    });

    Then(/^I should see primary navigation link as (.*)$/, async function(dashboard_link) {
        await expect(caseSummaryPage.primary_nav_dashboard_link.isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.primary_nav_dashboard_link.getText())
            .to
            .eventually
            .equal("Your cases");
    });

    Then(/^I should see a jui case bar$/, async function() {
        await expect(caseSummaryPage.case_bar.isDisplayed()).to.eventually.be.true;

    });

    When(/^I click on header logo Judicial case manager$/, async function() {
        await caseSummaryPage.judicial_case_manager_link.click();
        browser.sleep(SHORT_DELAY);

    });

    When(/^I click primary nav dashboard link$/, async function() {
        await caseSummaryPage.primary_nav_dashboard_link.click();
        browser.sleep(SHORT_DELAY);

    });


    Then(/^I should see case alert on summary page for that case$/, async function() {
        await expect(caseSummaryPage.case_alert.isDisplayed()).to.eventually.be.true;

    });

    Then(/^also can see case alert header as (.*)$/, async function(decision_needed) {
        await expect(caseSummaryPage.case_alert_heading.getText())
            .to
            .eventually
            .equal(decision_needed);


    });

    Then(/^I should see case action alert link$/, async function() {
        await expect(caseSummaryPage.case_alert_content_link.isDisplayed()).to.eventually.be.true;

    });


    Then(/^I should see Summary sub nav link$/, async function() {
      await expect(caseSummaryPage.summary_subnav_links.first().isDisplayed()).to.eventually.be.true;
        await expect(caseSummaryPage.summary_subnav_links.first().getText()).to.eventually.equal("Summary");

    });


    Then(/^I can see sub nav links as (.*),(.*),(.*)$/, async function(Parties,Casefile,Timeline) {
        await expect(caseSummaryPage.summary_subnav_links.get(1).getText()).to.eventually.equal(Parties);
        await expect(caseSummaryPage.summary_subnav_links.get(2).getText()).to.eventually.equal(Casefile);
        await expect(caseSummaryPage.summary_subnav_links.get(3).getText()).to.eventually.equal(Timeline);

    });

    When(/^I click on Parties sub nav link$/, async function() {
     await caseSummaryPage.summary_subnav_links.get(1).click();
     browser.sleep(SHORT_DELAY);

    });

    Then(/^I will be redirected to Parties page for that case$/, async function() {
        await expect(caseSummaryPage.case_header_text.getText()).to.eventually.equal("Parties");

    });


    When(/^I click on Case file sub nav link$/, async function() {
        await caseSummaryPage.summary_subnav_links.get(2).click();
        browser.sleep(SHORT_DELAY);
    });


    Then(/^I will be redirected to the Case file page for that case$/, async function() {
        await expect(caseSummaryPage.case_header_text.getText()).to.eventually.equal("Case file");

    });



    When(/^I click on Timeline sub nav link$/, async function() {
        await caseSummaryPage.summary_subnav_links.get(3).click();
        browser.sleep(SHORT_DELAY);

    });

    Then(/^I will be redirected to Timeline page for that case$/, async function() {
        await expect(caseSummaryPage.case_header_text.getText()).to.eventually.equal("Timeline");

    });

    When (/^I click on case action alert link$/, async function() {
        await caseSummaryPage.case_alert_content_link.click();
        browser.sleep(SHORT_DELAY);

    });



});
