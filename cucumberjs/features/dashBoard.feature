@wip
Feature: Dashboard

    Background:
        Given I logged in as a Judge
        When I am on the dashboard page


    @select_sscs_link @RIUI_370
    Scenario: Verify available SSCS cases
        When one or more cases are displayed
        Then I will see a list of all those cases
        When I select a case reference number
        Then I will be redirected to the Case Summary page for that case


    @RIUI_418
    Scenario: Verify when one or more SSCS cases
        When one or more cases are displayed
        Then I will see a list of all those SSCS cases


