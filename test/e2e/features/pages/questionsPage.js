'use strict';

function questionsPage() {
    this.questions_header = element(by.css('h1.hmcts-page-heading__title.govuk-heading-xl'));
    this.add_questions_btn = element(by.css('[data-selector="no-draft-add-questions-link"]'));
    this.no_draft_questions_text = element(by.css('[data-selector="no-draft-questions-details"]'));
    this.no_draft_question_btn = element(by.css('[data-selector="no-draft-add-questions-link"]'));
    this.create_draft_question_btn = element(by.css('[data-selector="create-draft-questions-link"]'));
    this.question_raised_already = element(by.css('[data-selector="questions-subject-link"]'));
    this.send_questions_btn = element(by.css('[data-selector="send-draft-questions-link"]'));
    this.draft_questions_details = element(by.css('[data-selector="draft-questions-details"]'));
    this.questions_nav_link = element.all(by.css('.hmcts-sub-navigation__link'));
}

module.exports = new questionsPage();
