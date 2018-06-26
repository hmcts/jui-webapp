@wip
Feature: Dashboard

    Background:
        Given I am logged in as a Judge
        When I am on the dashboard page


    @select_sscs_link @RIUI_370
    Scenario: Verify available SSCS cases
        When one or more cases are displayed
        Then I will see a list of all those SSCS cases
        When I select a case reference number
        Then I will be redirected to the Case Summary page for that case



    @RIUI_418
        Scenario: Verify when one or more SSCS cases
        When one or more cases are displayed
        Then I will see a list of all those SSCS cases


#    //TODO

    @RIUI_417
    Scenario: Verify date details for SSCS cases
        When one or more cases are displayed
        Then I will see date details for the list of cases displayed
        When I see 'Date of latest action' by date descending order (need to check? sorting)

