#
#@loginIDAM
#
#Feature: To login using valid and invalid login credentials
#  As a case worker
#  I need to be able to login to Dev A
#
#  @validLogin
#  Scenario Outline: Login attempt using valid login credentials
#    Given I am on Definition Import IDAM login page
#    When I enter username as "<validUsername>"
#    And I enter password as "<validPassword>"
#    And I click on signin
#    Then I am on Importer page
#
#
#    Examples:
#    |validUsername   |validPassword|
#    |nybgul@gmail.com|Monday01     |
#
##  @invalidLogin
##  Scenario Outline: Login attempt using invalid login credentials
##    Given I am on Definition Import IDAM login page
##    When I enter username as "<invalidUsername>"
##    And I enter password as "<invalidUsername>"
##    And I click on signin
##    Then I should see error message "Incorrect login details"
##
##    Examples:
##    |invalidUsername|invalidUsername|
##    |test@test.net  |test1test      |
