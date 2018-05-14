"use strict";

function searchPage() {
  this.case_number_field = element(by.css('input#caseReference'));
  this.apply = element(by.css('button.button'));
  this.invalid_search_err = element(by.css('ccd-search-result > div'));

}

module.exports = new searchPage;
