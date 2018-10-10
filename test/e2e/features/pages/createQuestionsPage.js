'use strict';

function createQuestionsPage() {
    this.create_questions_heading_text = element(by.css('[data-selector="create-questions-heading"]'));
    this.subject_field = element(by.css('[data-selector="subject-input"]'));
    this.questions_field = element(by.css('[data-selector="question-textarea"]'));
    this.save_question_btn = element(by.css('[data-selector="save-button"]'));
}

module.exports = new createQuestionsPage();
