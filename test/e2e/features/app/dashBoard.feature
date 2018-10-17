@dashboard
Feature: Dashboard

    Background:
        Given I navigate to JUI Url
        When I am logged into JUI web app
        Then I am on the dashboard page

    @RIUI_370 @RIUI_418 @all
    Scenario Outline: Verify available case types on Jui Dashboard
        When one or more cases <type> are displayed
        When I select a case <type>
        Then I will be redirected to the Case Summary page for that case <type>
        Examples:
        |type|
#        |PIP|
        |Divorce|



    @RIUI_417 @all
    Scenario: Verify date details for all type of cases
        Then I will see date details for the list of cases displayed
        When I see Date of latest action by date ascending order

    @RIUI-956 @all
    Scenario: Verify Dashboard table column header texts
        Then I should see table header columns
        Then I should see table each column header text as casenumber , Parties , Type, Decision needed on, Case received, Date of last event


    #FR specific judge to login n verify
    @RIUI-895
    Scenario: Verify FR cases 'Draft consent order' link redirection
        When I see Draft consent order on dashboard
        Then I select a Draft consent order from decision needed on column
        Then I will be redirected to the Case file page for that Financial remedy case


    @RIUI-895 @pending
    Scenario: Verify PIP cases 'Question Drafted' link redirection
        When I see Question
        When I select Question Drafted link
        Then I will be redirected to Questions Landing page





