'use strict';

function caseSummaryPage() {
    this.caseSummary_header_text = element(by.css('[data-selector="heading"]'));
    this.caseDetails_header_text = element.all(by.css(('[data-selector="title"]:nth-child(1)')));
    this.casefields = element.all(by.css('[data-selector="table-header"]:nth-child(1)'));



    this.selected_case_number = function() {
        this.selected_case.get(1).getText();
    };
}

module.exports = new caseSummaryPage;
