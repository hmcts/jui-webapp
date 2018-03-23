"use strict";
var workbasket = require("../pages/workbasketPage");
var viewcase = require("../pages/viewCasePage");
var pageActions = require("../pages/pageActions");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given, When, Then }) {
    var defaultJurisdiction = "Probate";
    var defaultCaseType = "Test Address Book Case";
    var defaultState = "Case created";

    Given('I am on Work Basket page', function (next) {
         expect(pageActions.returnTitle()).to.eventually.equals("Core Case Data | HMCTS").and.notify(next);
    });

    When('I click Apply button', function (next) {
      workbasket.applyButton.click().then(function (){
        next();
      }) ;
    });

    Then('I should see error message saying no results found', function (next) {
      expect(workbasket.notification.getText()).to.eventually.contains("No cases found. Try using different filters.").and.notify(next);
    });

    Then('I should see the defaults selected for a user', function (next) {
      expect(workbasket.jurisdiction.getText()).to.eventually.contains(defaultJurisdiction).and.notify(next);
      expect(workbasket.case_type.getText()).to.eventually.contains(defaultCaseType).and.notify(next);
      expect(workbasket.state.getText()).to.eventually.contains(defaultState).and.notify(next);
    });

    Given('I am on Work Basket Page', function (next) {
      expect(pageActions.returnTitle()).to.eventually.equals("Core Case Data | HMCTS").and.notify(next);
    });

    When('I select a jurisdiction', function (next) {
      workbasket.selectOption(defaultJurisdiction).click().then(function (){
        next();
      }) ;
    });

    When('I select a case type', function (next) {
      workbasket.selectOption(defaultCaseType).click().then(function (){
        next();
      }) ;
    });

    When('I select a state', function (next) {
      workbasket.selectOption(defaultState).click().then(function (){
        next();
      }) ;
    });

  Then('I should see case results', function (next) {
    expect(workbasket.workbasketResults.isDisplayed()).to.eventually.be.true.and.notify(next);
  });

  Given('I have case results displayed', function (next) {
    workbasket.applyButton.click().then(function (){
      next();
    }) ;

    expect(workbasket.workbasketResults.isDisplayed()).to.eventually.be.true.and.notify(next);
  });

  When('I click on view case', function (next) {
    workbasket.viewCase.click().then(function (){
      next();
    }) ;
  });



});
