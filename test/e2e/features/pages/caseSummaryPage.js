'use strict';

function caseSummaryPage() {
    this.case_header_text = element(by.css('h1.hmcts-page-heading__title.govuk-heading-xl'));
    this.caseDetails_header_text = element(by.css('app-data-list:nth-child(2) > div > h2'));
    this.representatives_text = element(by.css('app-data-list:nth-child(3) > div > h2'));
    this.panel_members_text = element(by.css('app-data-list:nth-child(3) > div > h2'));
    this.related_cases_text = element(by.css('app-data-list:nth-child(3) > div > h2'));
    this.linkedcase_text = element(by.css('app-data-list:nth-child(4) > div > h2'));
    this.casefields = element.all(by.css("[data-selector='table-cell']:nth-child(1)"));
    this.judicial_case_manager_logo = element(by.css('.hmcts-header__logotype-text'));
    this.judicial_case_manager_link = element(by.css('a.hmcts-header__link'));
    this.primary_nav_dashboard_link = element(by.css('a.hmcts-primary-navigation__link'));
    this.case_bar = element(by.css('.jui-casebar'));
    this.case_alert = element(by.css("[data-selector='case-action-alert']"));
    this.case_alert_heading = element(by.css('.jui-case-action-alert__heading'));
    this.case_alert_content_link = element(by.css('a.jui-case-action-alert__link'));
    this.summary_subnav_links = element.all(by.css('[data-selector="sub-nav-link"]'));

    this.make_decision = element(by.css('.jui-case-actions__list .jui-case-actions__item:nth-of-type(1) .jui-case-actions__link'));
    this.make_decision_change_link = element(by.css('[class] .app-check-your-answers__contents:nth-of-type(1) [routerlink]'));
    this.error_message = element(by.css('.govuk-error-summary__list li:nth-of-type(1)'));
    this.error_message_selection = element(by.css('#decision-error'));
    this.error_message_decision_notes = element(by.css('#notes-error'));
    this.decision_submitted = element(by.css('.govuk-heading-xl'));
    this.questions_tab = element.all(by.css('.hmcts-sub-navigation__link'));
}

module.exports = new caseSummaryPage();
