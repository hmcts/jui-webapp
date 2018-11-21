'use strict';

const questionsPage = require('../../pages/questionsPage');
const createQuestionsPage = require('../../pages/createQuestionsPage');
const questionsSuccessPage = require('../../pages/questionSuccessPage');
const {defineSupportCode} = require('cucumber');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../../../support/constants');


const EC = protractor.ExpectedConditions;

defineSupportCode(function ({Given, When, Then}) {

    When(/^I navigate to Questions page$/, async function () {
        browser.sleep(SHORT_DELAY);
        await questionsPage.questions_nav_link.get(4).click();
        });

    Then(/^I am on the questions screen$/, async function () {
        //browser.sleep(SHORT_DELAY);
        await expect(questionsPage.questions_header.isDisplayed()).to.eventually.be.true;
        await expect(questionsPage.questions_header.getText()).to.eventually.equal('Questions to appellant');
    });

    Then(/^I should see a message saying(.*)$/, async function (message) {
        await expect(questionsPage.draft_questions_details.isDisplayed()).to.eventually.be.true;
        await expect(questionsPage.draft_questions_details.getText()).to.eventually.equal(message);
    });

    Then(/^I should see 'Send questions' button$/, async function () {
        await expect(questionsPage.send_questions_btn.isDisplayed()).to.eventually.be.true;
        await expect(questionsPage.send_questions_btn.getText()).to.eventually.equal('Send questions')
    });

    Then(/^I should see 'create draft questions link' button$/, async function(){
        await expect(questionsPage.create_draft_question_btn.isDisplayed()).to.eventually.be.true;
        });

    Then(/^I click on Add questions button$/, async function () {
        browser.sleep(SHORT_DELAY);
        if (questionsPage.create_draft_question_btn.isDisplayed())
            questionsPage.create_draft_question_btn.click();
        else
            questionsPage.no_draft_question_btn.click();
    });

    When (/^I click on Save question button$/, async function(){
        await createQuestionsPage.save_question_btn.click();
    });

    Then(/^I will be redirected to the create questions page$/, async function () {
        browser.sleep(SHORT_DELAY);
        await expect(createQuestionsPage.create_questions_heading_text.isDisplayed()).to.eventually.to.be.true;
        await expect(createQuestionsPage.create_questions_heading_text.getText()).to.eventually.equal('Create question');
        });


    Then(/^I enter subject$/, async function () {
        await createQuestionsPage.subject_field.sendKeys("test");
    });

    Then(/^I enter question$/, async function () {
        await createQuestionsPage.questions_field.sendKeys("t");
    });

    Then(/^I am taken to the 'questions to appellant' screen where 'question added' is displayed$/, async function () {
        browser.sleep(SHORT_DELAY);
        await expect(questionsSuccessPage.question_added_succes_alert.isDisplayed()).to.eventually.be.true;
        await expect(questionsSuccessPage.question_added_success_alert_text.isDisplayed()).to.eventually.be.true;
        await expect(questionsSuccessPage.question_added_success_alert_text.getText()).to.eventually.equal('Question added');

    });


});
