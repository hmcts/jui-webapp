'use strict';

function caseSummaryPage() {
    this.caseSummary_header_text = element(by.css('h1'));
    this.caseDetails_header_text = element.all(by.css(('h2[data-selector="title"]:nth-child(1)')));
    this.selected_case = element.all(by.css("[data-selector='table-cell']")); // selector not working
    this.casefile = element(by.css('#content > app-case-viewer > app-document-panel > div > div.jui-casefile-document-wrapper > div > app-document-viewer > div:nth-child(1) > div > app-unsupported-viewer > p'));
    this.firstCaseFile = element(by.css("[data-selector=document-list-item-0")).element(by.css("[data-selector='document']"));
    this.secondCaseFile = element(by.css("[data-selector=document-list-item-1")).element(by.css("[data-selector='document']"));
    this.imageViewer = element(by.css("[data-hook='dm.viewer.img'"));
    this.footer = element(by.css("[class='jui-footer__heading']"));
    this.selected_case_number = function() {
        this.selected_case.get(1).getText();
    };
}

module.exports = new caseSummaryPage();
