"use strict";
function viewCasePage() {
  this.address = "http://localhost:3451/case/1";
  this.heading = element(by.css('.heading-large'));
  this.tab = element(by.css("[role=tab]"));
  this.tabname = element(by.linkText("DOB"));


  this.selectOption = function(value) {
    return element(by.cssContainingText('option', value));
  };


}
module.exports = new viewCasePage();
