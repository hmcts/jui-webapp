@questions
Feature: Questions

    Background:
        When I navigate to JUI Url
        Then I am logged into JUI web app
        When I select a case reference
        Then I will be redirected to the Case Summary page for that case type

        @RIUI_712
        Scenario: verify questions page
        When I navigate to Questions page
        Then I am on the questions screen






























