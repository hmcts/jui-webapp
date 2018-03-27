"use strict";
function pageActions() {

    this.errorMessage = $("span[class='error-message']");
    this.successMessage = $("div[class='alert-message']");
  this.submitButton = element(by.css('[type="submit"]'));

    this.returnTitle = function() {
        return browser.getTitle();
    };

  this.returnHeading = function() {
    return this.heading.getText();
  };


  this.errorMessageReturn = function () {
        return this.errorMessage.getText();
    }

    this.successMessageReturn = function () {
        return this.successMessage.getText();
    }



}
module.exports = new pageActions();
