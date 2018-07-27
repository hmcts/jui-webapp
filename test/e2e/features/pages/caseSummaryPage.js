'use strict';

function caseSummaryPage() {
    this.caseSummary_header_text = element(by.css('h1'));
    this.caseDetails_header_text = element.all(by.css(('h2[data-selector="title"]:nth-child(1)')));
    this.selected_case = element.all(by.css("[data-selector='table-cell']")); // selector not working


    this.selected_case_number = function() {
        this.selected_case.get(1).getText();
    };
}

module.exports = new caseSummaryPage();
