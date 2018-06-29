'use strict';

function dashBoardPage() {

    this.dashboard_header = element(by.css('h1'));
    this.table = element.all(by.css(('[data-selector="table-component"]')));
    this.case_reference_header = element.all(by.css('[role="columnheader"]'));
    this.parties_header = element(by.css(('[data-selector ="parties-header"]')));
    this.type_header = element(by.css(('[data-selector="type-header"]')));
    this.number_of_rows = element.all(by.css("[data-selector='table-row']"));
    this.case_number_links = element.all(by.css('[data-selector="case-reference-link"]'));
    this.parties_links = element.all(by.css('.govuk-table__cell.cdk-cell.cdk-column-parties'));
    this.type_links = element.all(by.css('.govuk-table__cell.cdk-cell.cdk-column-type'));


    this.select_first_case_number = function () {
        this.case_number_links.first().click();
    };

    this.verify_case_summary_page = function () {
        this.select_first_case_number();
        expect(browser.driver.getCurrentUrl()).to.eventually.equal("http://");
    };

    this.get_a_case_num = function () {
        this.case_number_links.first().getText();
        }



}

module.exports = new dashBoardPage;
