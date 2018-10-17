'use strict';

function caseSummaryPage() {
    this.caseSummary_header_text = element(by.css(".hmcts-page-heading__title-wrapper > h1"));
    this.caseDetails_header_text = element(by.css('app-data-list:nth-child(2) > div > h2'));
    this.representatives_text = element(by.css('app-data-list:nth-child(3) > div > h2'));
    this.linkedcase_text = element(by.css('app-data-list:nth-child(4) > div > h2'));
    this.panel_members_text = element(by.css('app-data-list:nth-child(3) > div > h2'));
    this.casefields = element.all(by.css("[data-selector='table-cell']:nth-child(1)"));

}

module.exports = new caseSummaryPage;
