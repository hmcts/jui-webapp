@Jui_HomePage
Feature: Jui webpage

  Background:
    Given I am on JUI web home page


  Scenario: Verify header of JUI webpage
    When I should see HMCTS logo
    Then I should see "Judicial UI" link
    Then I should see "Sign out"


  Scenario: Verify content of JUI web page
    And I should see the phase tag as "ALPHA"
    And I should see the App home page content as "Case list"


  Scenario: Verify footer links of JUI webpage
    And I should see Open Government Licence link
    When I click on Open Government Licence link
    Then I should be redirected to licence page



































