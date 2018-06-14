@dashboard
Feature: Dashboard

    Background:
        Given I am logged in as a Judge
        When I am on the dashboard page

    @select_sscs_link
    Scenario: Verify enable sscs cases selecting link
        When all case references are hyperlinked
        When I select a case reference
        Then I will be redirected to the Case Summary page for that case
