'user strict';

function makeDecisionPage() {
    this.make_decision_btn = element.all(by.css('a.govuk-button.hmcts-page-heading__button'));
    this.draft_consent_order_text = element(by.css('h1.govuk-fieldset__heading'));
    this.yes_btn = element(by.css("input#create-1[type='radio']"));
    this.no_btn = element(by.css("input#create-2[type='radio']"));
    this.continue_btn = element(by.css("input[type='submit'][value='Continue']"));
    this.textarea = element(by.css('textarea.govuk-textarea'));
    this.check_decision_header = element(by.css('h1.govuk-heading-xl'));
}


module.exports = new makeDecisionPage();
