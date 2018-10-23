'use strict';

function partiesPage(){
    this.parties_tabs = element.all(by.css("a.govuk-tabs__tab"));
    this.petitioner_details = element.all(by.css("tr td[data-selector='table-cell']"));





}

module.exports = new partiesPage;
