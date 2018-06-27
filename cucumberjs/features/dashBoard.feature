#@wip
#Feature: Dashboard
#
#    Background:
#        Given I am logged in as a Judge
#        When I am on the dashboard page
#
##    @RIUI_418 @manual
##    Scenario: Verify when no SSCS cases
##        When there are no cases listed
##        Then I will see a message saying No cases to work on
#
#    @RIUI_418
#        Scenario Outline: Verify when one or more SSCS cases
#        When one or more cases are displayed
#        Then I will see a list of all those SSCS cases
##        Examples:
##            | user_with_cases | user_without_cases |
##            |                 |                    |
#
#
#    @select_sscs_link @RIUI_370
#    Scenario: Verify available SSCS cases
#        When one or more cases are displayed
#        Then I will see a list of all those SSCS cases
#        When I select a case reference number
#        Then I will be redirected to the Case Summary page for that case
#
##    //TODO
##
##    @RIUI_417
##    Scenario: Verify date details for SSCS cases
##        When one or more cases are displayed
##        Then I will see date details for the list of cases displayed
##        When I see 'Date of latest action' by date descending order (need to check? sorting)
