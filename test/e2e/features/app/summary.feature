@summary
Feature: View Case Summary Page

    Background:
        Given I navigate to JUI Url
        When I am logged into JUI web app
        Then I select a case type
        Then I will be redirected to the Case Summary page for that case type


    @RIUI_299 @all
    Scenario: I can see the summary page
        Then I should expect the url to "match" "(.+)/(.+)/summary"



    @all
    Scenario: Verify summary page header, primary navigation link and case bar
        Then I should see header logo text as Judicial case manager
        Then I should see primary navigation link as Dashboard
        Then I should see a jui case bar


     @all
     Scenario: Verify Summary page header link navigation
         When I click on header logo Judicial case manager
         Then I will be redirected to the JUI dashboard page
         When I select a case type
         Then I should see primary navigation link as Dashboard
         When I click primary nav dashboard link
         Then I will be redirected to the JUI dashboard page


    @all
    Scenario: Verify summary page sub nav links and their redirected pages
        Then I should see Summary sub nav link
        Then I can see sub nav links as Parties,Case file,Timeline
        When I click on Parties sub nav link
        Then I will be redirected to Parties page for that case
        When I click on Case file sub nav link
        Then I will be redirected to the Case file page for that case
        When I click on Timeline sub nav link
        Then I will be redirected to Timeline page for that case




    @RIUI_299 @all
    Scenario Outline: I can see case summary and panel members information
        Then I should see case details of that case <type>
        Then I should see linked cases or panel members details for that case <type>
        Examples:
            | type    |
#            | Divorce |
#           |PIP    |



    @all
    Scenario: Verify Summary page Decision needed on status text
        Then I should see case alert on summary page for that case
        Then also can see case alert header as Decision needed
        Then I should see case action alert link



    @bug
    Scenario: select case action alert link redirects to key facts or case file page
        When I click on case action alert link
        Then I will be redirected to the Case file page for that case





