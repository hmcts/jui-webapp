'use strict';

function partiesPage() {
    this.parties_tabs = element.all(by.css('a.govuk-tabs__tab'));
    this.petitioner_details = element.all(by.css("tr td[data-selector='table-cell']"));
    this.tab_list = element.all(by.css('.govuk-tabs__list'));
    this.tab_components = element.all(by.css('.govuk-tabs__tab'));
}

module.exports = new partiesPage();
