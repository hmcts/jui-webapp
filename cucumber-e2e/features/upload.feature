@upload
Feature: upload functionality

  Background:
    Given I am on IDAM login page
    And I enter Email address as test@test.com
    And I enter Password as 123
    Then I click on Sign in

  Scenario: Upload
    When I see Upload
    Then I add a file to Upload
    When I click on Upload
    Then I should able to view uploaded file on List View



