'use strict' ;

function dashBoardPage() {

    this.dashboard_header = $("h1.govuk-heading-l");
    this.case_reference_header = $('[role="columnheader"]');
    this.parties_header = $('[data-selector =\'parties-header\']');
    this.type_header = $("[data-selector='type-header']");
    this.list_of_cases = $("[data-selector='table-row']");
    this.List_of_case_reference = $(".govuk-table__cell.cdk-cell.cdk-column-case_id");
    this.List_parties = $(".govuk-table__cell cdk-cell cdk-column-parties");
    this.List_type = $(".govuk-table__cell cdk-cell cdk-column-type");
    this.first_case_reference_link = $("[data-selector='case-reference-link]")[0];




   // dashboardTableHeader()
   //
   //  {
   //
   //      return element(this.case_reference_header).isPresent() && element(this.parties_header).isPresent() && element(this.type_header).isPresent()
   //
   //
   //  }
   //
   //  verifyListOfCases()
   //  {
   //     element.all(this.List_of_case_reference).getText();
   //
   //  }
   //
   //
   //
   //
   //
   //
   // clickOnCaseReference()
   //
   //  {
   //     element.all(this.first_case_reference_link).click();
   //
   //
   //  }
   //
   //
   //
   //
   //  this.select_hyper_link = function(summary_text){
   //      return element(by.css('', summary_text));
   //  }
   //
   //
   //
   // this.no_cases_assigned = function(no_cases_text){
   //      return element(by.css('', no_cases_text));
   //
   // }
   //
   //


}

module.exports = new dashBoardPage;
