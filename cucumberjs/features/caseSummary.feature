Feature: CaseSummary

    Background:
        Given I am logged in as a Judge
        When I am on the dashboard page
        Then I wait 2 seconds
        And I select a case reference



        Scenario: Verify case Summary Page Details
            Then I will be redirected to the Case Summary page for that case
            And I should see Parties , 'Case number', 'Case type'


            Scenario: Verify case Summary Page Representative details
            Names of the assigned Panel (Judge, Medical member, Disability qualified member)





