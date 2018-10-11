@summary
Feature: View Case Summary Page

    Background:
        Given I navigate to JUI Url
        When I am logged into JUI web app
        Then I select a case type
        Then I will be redirected to the Case Summary page for that case

    @RIUI_299 @all
    Scenario: I can see the summary page
        Then I should expect the url to "match" "(.+)/viewcase/(.+)/summary"

    @RIUI_299 @all
    Scenario: I can see case summary and panel members information
        Then I should see case details of that case
        Then I should see related cases or panel members details for that case

