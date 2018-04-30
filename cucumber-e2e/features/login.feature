@login
Feature: EM login fun
  Background:
    Given I am on IDAM login page

  Scenario Outline: Valid login
    When I enter valid Email address as <valid_username>
    Then I enter valid Password as <valid_password>
    And I click on Sign in
    Then I should see List View
  Examples:
  |valid_username|valid_password|
  |test@test.com |123           |
#  |naybgul@gmail.com              |Monday01              |

#   @upload
#    Scenario: Upload
#      When I see Upload
#      Then I add a file to Upload
#      And click on upload
#      Then I should see uploaded file on List View
#




