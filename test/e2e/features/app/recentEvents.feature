Feature: RecentEvents

   Background:
        Given I navigate to JUI
        Then I am logged in as a Judge
        When I select a case reference

    @RIUI_647
    Scenario: Verify timeline and recent events
        Then I see the timeline link
        When I click on timeline should see the recent events


    @RIUI_648
    Scenario: Verify recent events on summary page
        Then I see the recent events with all details displayed
        Then I see the latest three events showing
        When I click on view all events it should take to timeline page

    @RIUI_654
    Scenario: Verify Judge Panel
        Then I see the Judge Panel Details
