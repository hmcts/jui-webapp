Feature: CaseSummary

    Background:
        Given I am logged in as a Judge
        When I am on the dashboard page
        Then I wait 2 seconds
        When I select a case reference



        Scenario: Verify Summary Page Case and Representative Details
            Then I will be redirected to the Case Summary page for that case
            Then I should see Parties , Case number, Case type
            Then I should see Judge, Medical member, Disability qualified member



