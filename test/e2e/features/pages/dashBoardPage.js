'use strict';

function dashBoardPage() {
    this.dashboard_header = element(by.css('h1'));
    this.table = element.all(by.css(('[data-selector="table-component"]')));
    this.case_reference_header = element.all(by.css('[role="columnheader"]'));
    this.parties_header = element(by.css(('[data-selector ="parties-header"]')));
    this.type_header = element(by.css(('[data-selector="type-header"]')));
    this.number_of_rows = element.all(by.css('[data-selector="table-row"]'));
    this.case_number_links = element.all(by.css('[data-selector="case-reference-link"]'));
    this.parties_links = element.all(by.css('.govuk-table__cell.cdk-cell.cdk-column-parties'));
    this.type_links = element.all(by.css('.cdk-column-type > span'));
    this.type_rows = element.all(by.css('.govuk-table__row'));
    this.type = element.all(by.css("[data-selector='type-value']"));
    this.parties = (by.css('cdk-row.govuk-table__row:nth-child(2) > cdk-cell:nth-child(2) > span:nth-child(1)'));
    this.case_start_date = element(by.css(('[data-selector="caseStartDate-header"]')));
    this.date_of_last_action = element(by.css(('[data-selector="dateOfLastAction-header"]')));
    this.last_action_dates = element.all(by.css('[data-selector="dateOfLastAction-value"]'));
    this.sign_out_link = element(by.css('.hmcts-header__navigation-link'));
    this.case_links = element.all(by.css('.cdk-column-case_id >a[href]'));
    this.ng_links_FR_DIV = element.all(by.css('[ng-reflect-router-link="/jurisdiction/DIVORCE/casetype"][href]'));
    this.ng_links_PIP = element.all(by.css('[ng-reflect-router-link="/jurisdiction/SSCS/casetype/Be"][href]'));

    this.select_first_case_number = function() {
        this.case_number_links.first().click();
    };

    this.verify_case_summary_page = function() {
        this.select_first_case_number();
        expect(browser.driver.getCurrentUrl()).to.eventually.equal('');
    };

    this.get_a_case_num = function() {
        this.case_number_links.first().getText();
    };


}


module.exports = new dashBoardPage;
