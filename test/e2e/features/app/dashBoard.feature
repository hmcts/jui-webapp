Feature: Dashboard

   Background:
        Given I navigate to JUI
        Then I am logged in as a Judge
        When I am on the dashboard page



    @RIUI_370 @RIUI_418 @all
    Scenario Outline: Verify available SSCS cases
        When one or more cases <type> are displayed
        When I select a case <type>
        Then I will be redirected to the Case Summary page for that case
        Examples:
        |type|
        |Financial Remedy|



    @RIUI_417 @all
    Scenario: Verify date details for SSCS cases
        Then I will see date details for the list of cases displayed
        When I see Date of latest action by date ascending order




