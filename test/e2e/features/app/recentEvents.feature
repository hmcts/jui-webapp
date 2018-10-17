@timeline
Feature: RecentEvents

   Background:
        Given I navigate to JUI Url
        Then I am logged into JUI web app
        When I select a case type

    @RIUI_647, @all
    Scenario: Verify timeline and recent events
        Then I see the timeline link
        When I click on timeline should see the recent events


    @RIUI_648, @all
    Scenario: Verify recent events on summary page
        Then I see the recent events with all details displayed
        Then I see the latest three events showing
        When I click on view all events it should take to timeline page

# Require judge to be an SSCS judge
    @RIUI_654
    Scenario: Verify Judge Panel
        Then I see the Judge Panel Details
