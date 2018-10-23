'use strict';

function caseSummaryPage() {
    this.case_header_text = element(by.css(".hmcts-page-heading__title-wrapper > h1.hmcts-page-heading__title.govuk-heading-xl"));
    this.caseDetails_header_text = element(by.css('app-data-list:nth-child(2) > div > h2'));
    this.representatives_text = element(by.css('app-data-list:nth-child(3) > div > h2'));
    this.linkedcase_text = element(by.css('app-data-list:nth-child(4) > div > h2'));
    this.panel_members_text = element(by.css('app-data-list:nth-child(3) > div > h2'));
    this.casefields = element.all(by.css("[data-selector='table-cell']:nth-child(1)"));
    this.judicial_case_manager_logo = element(by.css('.hmcts-header__logotype-text'));
    this.judicial_case_manager_link = element(by.css("a.hmcts-header__link"));
    this.primary_nav_dashboard_link = element(by.css("a.hmcts-primary-navigation__link"));
    this.case_bar = element(by.css(".jui-casebar"));
    this.case_alert = element(by.css("[data-selector='case-action-alert']"));
    this.case_alert_heading = element(by.css(".jui-case-action-alert__heading"));
    this.case_alert_content_link =element(by.css('a.jui-case-action-alert__link'));
    this.summary_subnav_links = element.all(by.css('[data-selector="sub-nav-link"]'));


}

module.exports = new caseSummaryPage;
