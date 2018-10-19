@parties
Feature: Verify Parties tab functionality for any case type

    Background:
        Given I navigate to JUI Url
        When I am logged into JUI web app
        When I select a case type
        Then I will be redirected to the Case Summary page for that case type
        When I click on Parties sub nav link
        Then I will be redirected to Parties page for that case


    @all
    Scenario: Verify Parties tab for a case type
        Then I can see Petitioner and Respondent tabs

    @all
    Scenario: Verify Petitioner details for that case type
        When I select Petitioner tab
        Then I can see Full name,Address,Phone,Email,Representative

    @all
    Scenario: Verify Representative details for that case type
        When I select Respondent tab
        Then I can see Full name,Address,Phone,Email,Representative

