Feature: Login with different user types

  Scenario: Login as a standard user
    Given I am on the main screen
    When I navigate to the login page
    When I login as "STANDARD"
    Then I should see products
    Then I logout

  Scenario: Attempt login with a locked account
    When I login as "LOCKED"
    Then I should see locked error

  Scenario: Attempt login with mismatched credentials
    When I login as "NO_MATCH"
    Then I should see no match error

  Scenario: Attempt login with missing username and password
    When I login as "NO_USER_DETAILS"
    Then I should see no username error

  Scenario: Attempt login with missing password
    When I login as "NO_PASSWORD"
    Then I should see no password error
