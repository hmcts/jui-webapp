'use strict';

function dashBoardPage() {
    this.dashboard_header = element(by.css('h1'));
    this.table = element.all(by.css(('[data-selector="table-component"]')));
    this.case_number_header = element(by.css(".govuk-table__header.cdk-header-cell.cdk-column-case_id"));
    this.parties_header = element(by.css(('[data-selector ="parties-header"]')));
    this.type_header = element(by.css(('[data-selector="type-header"]')));
    this.number_of_rows = element.all(by.css('[data-selector="table-row"]'));
    this.case_number_links = element.all(by.css('[data-selector="case-reference-link"]'));
    this.parties_links = element.all(by.css('.govuk-table__cell.cdk-cell.cdk-column-parties'));
    this.type_links = element.all(by.css('.cdk-column-type > span'));
    this.type_rows = element.all(by.css('.govuk-table__row'));
    this.type = element.all(by.css("[data-selector='type-value']"));
    this.parties = (by.css('cdk-row.govuk-table__row:nth-child(2) > cdk-cell:nth-child(2) > span:nth-child(1)'));
    this.case_received_header = element(by.css(('[data-selector="createdDate-header"]')));
    this.case_start_dates = element.all(by.css(('[data-selector="createdDate-value"]')));
    this.case_start_date_header = element(by.css(('[data-selector="createdDate-header"]')));
    this.date_of_last_action_header = element(by.css(('[data-selector="lastModified-header"]')));
    this.last_action_dates = element.all(by.css('[data-selector="lastModified-value"]'));
    this.sign_out_link = element(by.css('a.hmcts-header__navigation-link'));
    this.case_links = element.all(by.css('.cdk-column-case_id >a[href]'));
    this.ng_links_FR_DIV = element.all(by.css('[ng-reflect-router-link="/case/DIVORCE/"][href]'));
    this.ng_links_PIP = element.all(by.css('[ng-reflect-router-link="/case/SSCS/Be"][href]'));
    this.your_cases = element(by.css('span.govuk-heading-m'));
    this.table_column_header = element(by.css(".govuk-table__head.cdk-header-row[role='row']"));
    this.decision_needed_on_header = element(by.css(".govuk-table__header.cdk-header-cell.cdk-column-state"));
    this.draft_consent_order_link = element.all(by.css('[data-selector="case-status-reference-link"]'));




}


module.exports = new dashBoardPage;
