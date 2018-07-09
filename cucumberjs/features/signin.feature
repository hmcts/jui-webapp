@signin
Feature: JUI Signin

#    Background:
#        Given I am on Jui signin page

    Scenario: Verify Jui app signin functionality
        Given I am on Jui signin page
        When I enter email address as test@test.com
        When I enter password as 123
        When I click on signin
        Then I should see dashboard page
        Then I signout

    Scenario: Verify redirection to login page for un authenticated user
#        Given I am not authenticated with Idam
        Given I am on Jui signin page
        When I enter email address as testasdf@test.com
        When I enter password as 123
        When I try to access a JUI page
        Then I should be redirected to the Idam login page
