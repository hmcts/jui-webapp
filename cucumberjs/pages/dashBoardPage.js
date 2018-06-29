'use strict' ;

function dashBoardPage() {

    this.table = $("[data-selector='table-component']");
    this.rows = this.table.all($("[data-selector='table-row']"))
    this.dashboard_header = $("#lst-ib");
    this.number_of_rows = element.all(by.css("[data-selector='table-row']"));
    this.case_link = $("[data-selector='case-reference-link']");


    this.verify_dashboard_page = function(caselist_header){
        return element(by.css('', caselist_header));

    }


    this.select_hyper_link = function(summary_text){
        return element(by.css('', summary_text));
    }

   this.no_cases_assigned = function(no_cases_text){
        return element(by.css('', no_cases_text));

   }




}

module.exports = new dashBoardPage;
