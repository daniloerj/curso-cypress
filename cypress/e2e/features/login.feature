Feature: Login functionality
  As a user, I want to log in to the Practice Test Automation site
  So that I can access protected areas

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username and password
    And I click the login button
    Then I should see the secure area page
    And I should see a logout button

  Scenario: Login with invalid username
    Given I am on the login page
    When I enter an invalid username and valid password
    And I click the login button
    Then I should see an error message for invalid username

  Scenario: Login with invalid password
    Given I am on the login page
    When I enter a valid username and invalid password
    And I click the login button
    Then I should see an error message for invalid password
