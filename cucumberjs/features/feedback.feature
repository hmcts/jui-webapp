@feedback
Feature:feedback function

  Background:
    Given I am on IDAM login page
    When I see feedback link

  Scenario: Verify feedback functionality
    When I click on feedback
    Then I should see header message saying "Help us improve this service"
    When I choose a service
    Then I enter my feedback
    When I click submit
    Then I should see a message after feedback saying "Thank you for your feedback"

