
Feature: View Case Summary Page

    Background:
        Given I navigate to JUI
        When I am logged in as a Judge
        Then I select a case reference
        Then I will be redirected to the Case Summary page for that case


    Scenario: I can see the summary page
        Then I should expect the url to "match" "(.+)/viewcase/(.+)/summary"

    @RIUI_299
    Scenario: I can see case summary and panel members information
        Then I should see case summary details of that case
        Then I should see panel members details for that case



