@signout
Feature: sign out

  Background:
    Given I am on IDAM login page

    Scenario: verify sign out
      When I enter email address as
      When I enter password as Monday01
      When I click on sign in
      Then I will be redirected to caselist
      Then I click on Sign Out
      Then I should be redirect to signin page



