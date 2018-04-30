@upload
Feature: upload functionality

  Background:
    Given I am on IDAM login page
    When I enter Email address as test@test.com
    When I enter Password as 123
    Then I click on Sign in

  Scenario: Upload
    When I see Upload
    Then I add a file to Upload
    When I click on upload
    Then I should see uploaded file on List View



