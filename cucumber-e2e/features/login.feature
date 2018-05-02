@login
Feature: EM login fun

  Background:
    Given I am on IDAM login page

  Scenario Outline: Valid login
    When I enter Email address as <valid_username>
    Then I enter Password as <valid_password>
    When I click on Sign in
    Then I should redirect to the list page
    And I click on Sign out
    Examples:
      | valid_username | valid_password |
      | test@test.com  | 123            |



  Scenario Outline: inValid login
    When I enter Email address as <invalid_username>
    Then I enter Password as <invalid_password>
    When I click on Sign in
    Then I should see error message saying as <err_message>
    Examples:
      | invalid_username | invalid_password | err_message                          |
      | test@gmail.com   | test             | Incorrect email/password combination |









