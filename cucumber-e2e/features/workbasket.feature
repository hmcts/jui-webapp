#@workbasket
#Feature: To make sure workbasket works as expected
#  As a case worker
#  I need to be able to view cases list in work basket
#
#  Background:
#  Given I am on Work Basket Page
#
#  Scenario: Making sure user profile defaults are selected for dropdowns
#    Then I should see the defaults selected for a user
#
#  Scenario: Making sure correct message is displayed when no results are found for selections
#    Given there is no case data
#    When I select a jurisdiction
#    And I select a case type
#    And I select a state
#    And I click Apply button
#    Then I should see error message saying no results found
#
#  Scenario: Making sure results panel is displayed when cases are found
#    Given case data exists
#    When I select a jurisdiction
#    And I select a case type
#    And I select a state
#    And I click Apply button
#    Then I should see case results
#
