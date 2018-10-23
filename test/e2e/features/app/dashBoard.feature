@dashboard
Feature: Dashboard

   Background:
      Given I navigate to JUI Url
        When I am logged into JUI web app
        Then I am on the dashboard page



    @RIUI_370 @RIUI_418 @all
    Scenario Outline: Verify available jurdisctions types
        When one or more cases <type> are displayed
        When I select a case <type>
        Then I will be redirected to the Case Summary page for that case type
        Examples:
        |type|
#        |PIP|
        |Divorce|



    @RIUI_417 @all @smoke
    Scenario: Verify date details for SSCS cases
        Then I will see date details for the list of cases displayed
        When I see Date of latest action by date ascending order




