@search
Feature: search a case

  Background:
    Given I am on IDAM login page
    When I enter email address as nybgul@gmail.com
    When I enter password as Monday01
    When I click on sign in
    Then I will be redirected to caselist

  Scenario Outline: Verify Searching an invalid case function
    When I click on search
    When I enter invalid case number as "<case_number>"
    When I click on Apply
    Then I should see message saying "<message>"

    Examples:
      | case_number | message                                      |
      | 0123        | No cases found. Try using different filters. |
