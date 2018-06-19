'use strict' ;

function dashBoardPage() {

    this.dashboard_header = $("#lst-ib");
    this.list_of_cases = $("");
    this.case_link = $("");


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
