import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";

const loginPage = new LoginPage();

Given('I am on the login page', () => {
  loginPage.visit();
});

When('I enter valid username and password', () => {
  loginPage.fillUsername('student');
  loginPage.fillPassword('Password123');
});

When('I enter an invalid username and valid password', () => {
  loginPage.fillUsername('invalidUser');
  loginPage.fillPassword('Password123');
});

When('I enter a valid username and invalid password', () => {
  loginPage.fillUsername('student');
  loginPage.fillPassword('invalidPass');
});

When('I leave username and password empty', () => {
  loginPage.fillUsername('');
  loginPage.fillPassword('');
});

When('I click the login button', () => {
  loginPage.clickLogin();
});

Then('I should see the secure area page', () => {
  loginPage.getSecureArea().should('contain.text', 'Logged In Successfully');
});

Then('I should see a logout button', () => {
  loginPage.getLogoutButton().should('exist');
});

Then('I should see an error message for invalid credentials', () => {
  loginPage.getErrorMessage().should('contain.text', 'Your username is invalid!');
});

Then('I should see a validation message for required fields', () => {
  loginPage.getErrorMessage().should('exist');
});
