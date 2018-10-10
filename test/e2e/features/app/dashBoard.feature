@dashboard
Feature: Dashboard

    Background:
        Given I navigate to JUI Url
        When I am logged into JUI web app
        Then I am on the dashboard page


    @RIUI_370 @RIUI_418 @all
    Scenario Outline: Verify available case types on Jui Dashboard
        When one or more cases <type> are displayed
        When I select a case <type>
        Then I will be redirected to the Case Summary page for that case
        Examples:
            | type             |
            | Financial remedy |
            |PIP               |
            |Divorce           |


    @RIUI_417 @all
    Scenario: Verify date details for SSCS cases
        Then I will see date details for the list of cases displayed
        When I see Date of latest action by date ascending order


    Scenario: Verify Dashboard table column header texts
        Then I should see table column text as "", "", "", "", "", ""

    @RIUI-895
    Scenario: Verify Deeplink status text on Dashboard
        When I see "Draft Consent Order"
        Then I select a Draft Consent Order
        Then I will be redirected to the Case file page for that case

    Scenario: Verify Question Drafted link redirection
        When I select Question Drafted link
        Then I will be redirected to Questions Landing page





