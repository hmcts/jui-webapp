Feature: Questions

    Background:
        Given I navigate to JUI
        Then I am logged in as a Judge
        When I select a case reference
        Then I will be redirected to the Case Summary page for that case

        @all @RIUI_712
        Scenario: verify questions page
        When I navigate to Questions page
        Then I am on the questions screen
















