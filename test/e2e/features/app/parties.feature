@parties
Feature: Parties

    Background:
        Given I navigate to JUI Url
        When I am logged into JUI web app
        When I select a case type
        Then I will be redirected to the Case Summary page for that case type
        When I click on Parties sub nav link
        Then I will be redirected to Parties page for that case


    @all # comment out by alec need to work with Div, FR and SSCS
    Scenario Outline: Verify Parties tab for a case type
        Then I can see that case <type> tab component
        Examples:
        |type|
        |Financial remedy|


    @all # comment out by alec need to work with Div, FR and SSCS
    Scenario Outline: Verify Petitioner details for that case type
        When I select Petitioner tab
        Then I can see Full name,Address,Phone,Email,Representative
        Examples:
        |type|
        |Financial remedy|

    @all # comment out by alec need to work with Div, FR and SSCS
    Scenario: Verify Representative details for that case type
        When I select Respondent tab
        Then I can see Full name,Address,Phone,Email,Representative

