'use strict';

function caseSummaryPage() {
    this.caseSummary_header_text = element(by.css("[data-selector='heading']"));
    this.caseDetails_header_text = element.all(by.css(("[data-selector='title']:nth-child(1)")));
    this.casefields = element.all(by.css("[data-selector='table-cell']:nth-child(1)"));

}

module.exports = new caseSummaryPage;
