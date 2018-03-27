@Jui_HomePage
Feature: Jui webpage

  Background:
    Given I am on JUI web home page


  Scenario: Verify header of JUI webpage
    And I should see HMCTS logo
    And I should see "Judicial UI" link
    And I should see "Sign out"


  Scenario: Verify content of JUI web page
    #And I should see the page content as "This is a new service – your"
    And I should see the App home page content as "home works!"


  Scenario: Verify footer links of JUI webpage
    And I should see Open Government Licence link
    When I click on Open Government Licence link
    Then I should be redirected to licence page


































