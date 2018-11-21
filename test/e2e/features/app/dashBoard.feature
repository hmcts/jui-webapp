@dashboard
Feature: Dashboard

    Background:
        Given I navigate to JUI Url

    @RIUI-956 @all
    Scenario: Verify Dashboard table column header texts
        When I am logged into JUI web app
        Then I will be redirected to the JUI dashboard page
        Then I should see table header columns
        Then I should see table each column header text as Case number, Parties, Type, Decision needed on, Case received, Date of last event


    @RIUI_370 @RIUI_418 @all
    Scenario Outline: Verify available case types on Jui Dashboard
        When I am logged into JUI web app
        Then I will be redirected to the JUI dashboard page
        When one or more cases <type> are displayed
        When I select a case <type>
        Then I will be redirected to the Case Summary page for that case <type>
        Examples:
            | type    |
            | Financial Remedy |



    @RIUI_417 @all
    Scenario: Verify date details for all type of cases
        When I am logged into JUI web app
        Then I will be redirected to the JUI dashboard page
        Then I will see date details for the list of cases displayed
        When I see Date of latest action by date ascending order



    #FR specific judge to login n verify
   @FR_case
    Scenario: Verify Draft consent order redirects correct case
        When I am logged into JUI web app with FR judge details
        Then I will be redirected to the JUI dashboard page
        When I select a Draft consent order from decision needed on column
        Then I will be redirected to the Case file page for that Financial remedy case



    #SSCS specific judge
    @RIUI-895 @all
    Scenario: Verify PIP cases 'Question Drafted' link redirection
        When I am logged into JUI web app with SSCS judge details
        Then I will be redirected to the JUI dashboard page
        When I select a case link
        Then I will be redirected to the Case Summary page for that case type
        When I navigate to Questions page
        Then I am on the questions screen





