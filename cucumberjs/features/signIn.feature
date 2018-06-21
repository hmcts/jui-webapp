@signin
Feature: JUI Signin

    Background:
        Given I am on Jui signin page

    Scenario: Verify Jui app signin functionality
        When I enter email address as "test@test.com"
        When I enter password as "123"
        When I click on signin
        Then I am on the dashboard page
