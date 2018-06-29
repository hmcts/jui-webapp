'use strict';

function caseSummaryPage(){
  this.caseSummary_header_text = $("h1");
  this.caseDetails_header_text = $("h2");
  this.selected_case = element.all(by.css("tr:nth-child(2) > td"));




  this.selected_case_number = function () {
      this.selected_case.first().getText();
      }



    // this.verify_case_num_for_that_case = function () {
    //     this.selected_case.first().getText().then( async function(case_number){
    //         browser.pause();
    //         browser.ignoreSynchronization = true;
    //         browser.driver.navigate().back();
    //         browser.sleep(100000);
    //         await browser.driver.sleep(10000);
    //         browser.waitForAngular();
    //         await expect(dashBoardPage.case_number_links.first().getText()).to.eventually.equal(case_number);
    //     });
    // }


}
module.exports = new caseSummaryPage;
