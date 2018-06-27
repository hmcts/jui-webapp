Feature: Do stuff

    Scenario: User can log in
        Given I navigate to JUI
        And I login
        Then I should expect "jui-header" to be visible

    Scenario: User is currently logged in
        Given I navigate to JUI
        And I login
        Then I should expect "jui-header" to be visible
        And I refresh the page
        Then I should expect "jui-header" to be visible
