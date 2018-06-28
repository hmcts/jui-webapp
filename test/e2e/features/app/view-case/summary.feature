Feature: View Case Summary Page

    Scenario: I can see the summary page
        Given I navigate to JUI
        And I login
        And I click "first-case|case-reference-link"
        And I wait 1 second
        Then I should expect the url to "match" "(.+)/viewcase/(.+)/summary"