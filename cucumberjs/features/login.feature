@login
Feature: CCD Login

  Background:
    Given I am on IDAM login page

  Scenario Outline: Verify login functionality
    When I enter email address as <email_address>
    When I enter password as <pwd>
    When I click on sign in
    Then I will be redirected to caselist

    Examples:
        | email_address    | pwd      |
        | nybgul@gmail.com |Monday01  |

