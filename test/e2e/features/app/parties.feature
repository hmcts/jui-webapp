@parties
    Feature: Verify Jui Parties tab functionality

        Background:
            Given I am logged into JUI web app
            Then I navigate to "Summary Page"
            When I select "Parties" tab
            Then I should see parties info related to that case type

