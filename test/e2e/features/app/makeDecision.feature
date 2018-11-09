
Feature: Make Decision

   Background:
       Given I navigate to JUI Url
        Then I am logged into JUI web app
        When I select a case reference
        Then I click the Make decision button

    @makedecision @all @smoke
    Scenario: Verify the Don't Approve on Make Decision
        Then I select Don't Approve and click continue
        Then I verify the Check Decision page

        @makedecision
        Scenario: Verify Approving a Make decision
            Then I see approve the draft consent order option
            When I click on "Yes" option
            Then I click on Continue
            Then I enter notes for court administration
            When I click on Continue
            Then I am on check your decision page


