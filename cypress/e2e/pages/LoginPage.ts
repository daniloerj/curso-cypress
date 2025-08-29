export class LoginPage {
  visit() {
    cy.visit('/practice-test-login/')
  }

  fillUsername(username: string) {
    cy.get('#username').clear().type(username)
  }

  fillPassword(password: string) {
    cy.get('#password').clear().type(password)
  }

  clickLogin() {
    cy.get('#submit').click()
  }

  getErrorMessage() {
    return cy.get('.error')
  }

  getLogoutButton() {
    return cy.get('a[href="/practice-test-login/"]')
  }

  getSecureArea() {
    return cy.get('.post-title')
  }
}
