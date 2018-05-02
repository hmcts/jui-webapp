@view
Feature: View Function

  Background:
    Given I am on IDAM login page
    And I enter Email address as test@test.com
    And I enter Password as 123
    Then I click on Sign in
    Then I add a file to Upload
    When I click on Upload
    Then I should able to view uploaded file on List View


    Scenario: Verify view functionality
      When I see View button
      Then I click on View
      And I should be redirect to viewer page
      And I should able to see the uploaded image on viewer page
