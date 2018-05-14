"use strict";

 function searchPage() {
  this.apply = element(by.css('#dynamicFilters'));
  this.case_number_field = element(by.css('input#caseReference'));
  this.invalid_search_err = element(by.css('button.button'));

 }
 module.exports = new searchPage;
