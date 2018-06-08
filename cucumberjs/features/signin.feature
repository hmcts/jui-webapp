@signin
Feature: JUI Signin

    Background:
        Given I am on Jui signin page

    Scenario: Verify Jui app signin functionality
        When I enter email address as ""
        When I enter password as ""
        When I click on signin
        Then I should see dashboard page

