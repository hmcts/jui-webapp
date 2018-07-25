Feature: Do stuff

    @all
    Scenario: User can log in
        Given I navigate to JUI
        And I login
        Then I should expect "jui-header" to be visible
        And I click "jui-header|Signout-link"

#    @all
#    Scenario: User is currently logged in
#        Given I navigate to JUI
#        And I login
#        Then I should expect "jui-header" to be visible
#        And I refresh the page
#        Then I should expect "jui-header" to be visible
#        And I click "jui-header|Signout-link"

#    @all
#    Scenario: Verify redirection to login page for un authenticated user
#        Given I navigate to JUI
#        And I login as a fake user
#        Then I should expect the title to "match" "Sign in - HMCTS Access"
#        And I click "jui-header|Signout-link"
