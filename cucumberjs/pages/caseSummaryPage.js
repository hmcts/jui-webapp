'use strict';

function caseSummaryPage(){
  this.caseSummary_header_text = $("h1");
  this.caseDetails_header_text = $("h2");
  this.selected_case = element.all(by.css("tr:nth-child(2) > td"));



  this.selected_case_number = function () {

      this.selected_case.first().isDisplayed();
      this.selected_case.first().getText();


  }


}
module.exports = new caseSummaryPage;
