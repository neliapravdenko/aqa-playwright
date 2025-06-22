import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class SignUpForm extends BasePage {
  public readonly signUpModal: Locator = this.page.locator('//*[@class="modal-content"]');
  public readonly registrationHeadingText: Locator = this.page.locator(
    '//*[@class="modal-title" and contains (text(), "Registration")]'
  );
  public readonly nameField: Locator = this.page.locator('//*[@id="signupName"]');
  public readonly lastNameField: Locator = this.page.locator('//*[@id="signupLastName"]');
  public readonly emailField: Locator = this.page.locator('//*[@id="signupEmail"]');
  public readonly passwordField: Locator = this.page.locator('//*[@id="signupPassword"]');
  public readonly repeatPasswordField: Locator = this.page.locator('//*[@id="signupRepeatPassword"]');
  public readonly registerButton: Locator = this.page.locator('//button[contains(text(), "Register")]');
  public readonly userProfileIcon: Locator = this.page.locator('//app-user-nav//img');
  public readonly errorMessage: Locator = this.page.locator('//*[@class="invalid-feedback"]/p');

  async enterName(name: string): Promise<any> {
    await this.nameField.fill(name);
  }

  async enterLastName(lastName: string): Promise<any> {
    await this.lastNameField.fill(lastName);
  }

  async enterEmail(email: string): Promise<any> {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string): Promise<any> {
    await this.passwordField.fill(password);
  }

  async enterRepeatPassword(repeatedPassword: string): Promise<any> {
    await this.repeatPasswordField.fill(repeatedPassword);
  }

  async clickRegisterButton(): Promise<any> {
    await this.registerButton.click();
  }

  async registerUser(name: string, lastName: string, email: string, password: string, repeatedPassword: string) {
    await this.enterName(name);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterRepeatPassword(repeatedPassword);
    await this.clickRegisterButton();
  }

  private getFieldLocator(fieldName: string): Locator {
    switch (fieldName.toLowerCase()) {
      case 'name':
        return this.nameField;
      case 'lastname':
        return this.lastNameField;
      case 'email':
        return this.emailField;
      case 'password':
        return this.passwordField;
      case 'repeatpassword':
        return this.repeatPasswordField;
      default:
        throw new Error(`Field "${fieldName}" is not defined in the form`);
    }
  }

  async triggerEmptyErrorOnField(fieldName: string): Promise<any> {
    const element = this.getFieldLocator(fieldName);
    await element.focus();
    await element.blur();
  }

  async unfocusField(fieldName: string): Promise<any> {
    const element = this.getFieldLocator(fieldName);
    await element.blur();
  }
}
