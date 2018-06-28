@wip
Feature: Dashboard

    Background:
        Given I am logged in as a Judge
        When I am on the dashboard page
        When one or more cases are displayed


    @select_sscs_link @RIUI_370
    Scenario: Verify available SSCS cases
        And all case references are hyperlinked
        When I select a case reference
        Then I will be redirected to the Case Summary page for that case







