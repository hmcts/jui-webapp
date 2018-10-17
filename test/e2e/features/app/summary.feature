@summary
Feature: View Case Summary Page

    Background:
        Given I navigate to JUI Url
        When I am logged into JUI web app
        Then I select a case type
        Then I will be redirected to the Case Summary page for that case type

    @RIUI_299 @all
    Scenario: I can see the summary page
        Then I should expect the url to "match" "(.+)/viewcase/(.+)/summary"

    @RIUI_299 @all
    Scenario Outline: I can see case summary and panel members information
        Then I should see case details of that case <type>
        Then I should see linked cases or panel members details for that case <type>
        Examples:
        |type|
        |Divorce|
#        |PIP    |





