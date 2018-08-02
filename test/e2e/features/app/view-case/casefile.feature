Feature: As authenticated user I can access case file

@RIUI_303, @all
Scenario: Accessing the case file landing page
    Given I navigate to JUI
    And I login
    When I navigate to case "1531142400632150"
    Then I should expect "heading" to be visible
    Then I should expect the file on top to be selected
    Then I should expect "document-list-item-0" to be visible
    Then I should expect "document-list-item-1" to be visible
    Then I should expect "document-list-item-2" to be visible
    Then I should expect "document-list-item-3" to be visible
    Then I should expect "document-list-item-4" to be visible
    Then I should see the text displayed as "This file type is not supported. Please click here to download."


@RIUI-303, @all
Scenario: Selecting a document from the list
    Given I navigate to JUI
    And I login
    When I navigate to case "1531142400632150"
    When I click "document-list-item-1|document"
    Then I should expect "heading" to be visible
    Then I should expect the second file to be selected
    Then I should expect "document-list-item-0" to be visible
    Then I should expect "document-list-item-1" to be visible
    Then I should expect "document-list-item-2" to be visible
    Then I should expect "document-list-item-3" to be visible
    Then I should expect "document-list-item-4" to be visible
    Then I should be able to view image

#@RIUI-303, @all
#Scenario: Scrolling the document
#    Given I navigate to JUI
#    And I login
#    When I navigate to case "1531142400632150"
#    When I click "document-list-item-3|document"
#    When I scroll to the bottom of the page
#    Then I should expect "document-list-item-0" to be visible
#    Then I should expect "heading" to be visible
