@casefile
Feature: Case File

    Background:
        Given I navigate to JUI Url
        Then I am logged into JUI web app
        When I select a case type
        Then I will be redirected to the Case Summary page for that case type

    @all
    Scenario: Verify case file navigation from case summary page
        Then I can see sub nav links as Parties,Case file,Timeline
        When I click on Case file sub nav link
        Then I will be redirected to the Case file page for that case







