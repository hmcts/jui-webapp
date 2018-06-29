Feature: Dashboard

    Background:
        Given I am logged in as a Judge
        When I am on the dashboard page
        When one or more cases are displayed


    @RIUI_370 @RIUI_418
    Scenario: Verify available SSCS cases
        When all case numbers are hyperlinked
        When I select a case reference
        Then I will be redirected to the Case Summary page for that case







