Feature: Login
  As a user I can login to application

  Scenario: User can login to application
    Given open login page
    When fill login form
    And click on submit button
    Then expect to see application content
