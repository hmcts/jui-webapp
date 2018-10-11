@login
Feature: Login

    Background:
        When I navigate to JUI Url

    @RIUI_288 @login @all
    Scenario: un-authenticated user login
        Then I am on Idam login page
        When I enter an Invalid email-address and password to login
        Then I should be redirected to the Idam login page
        Then I should see failure error summary


    @RIUI_288 @login @all
    Scenario: authenticated user login
        Given I am on Idam login page
        When I enter an valid email-address and password to login
        Then I should be redirected to JUI dashboard page


    @RIUI_289 @logout @all
    Scenario: log out from JUI
        Given I am logged into JUI web app
        Then I should be redirected to JUI dashboard page
        When I select the sign out link
        Then I should be redirected to the Idam login page


    @RIUI_289 @logout @all
    Scenario: I can log out from any page within the JUI Service
        Given I am logged into JUI web app
        When I select a case Financial remedy
        Then I will be redirected to the Case Summary page for that case
        When I select the sign out link
        Then I should be redirected to the Idam login page

