
Feature: Make Decision Don't Approve

   Background:
       Given I navigate to JUI Url
        Then I am logged into JUI web app
        When I select a case reference
        Then I click the Make Decision button

    @makedecision @all @smoke
    Scenario: Verify the Don't Approve on Make Decision
        Then I select Don't Approve and click continue
        Then I verify the Check Decision page



