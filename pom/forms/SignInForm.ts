import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class SignInForm extends BasePage {
  public readonly signInModal: Locator = this.page.locator('//*[@class="modal-content"]');
  public readonly modalHeadingText: Locator = this.page.locator(
    '//*[@class="modal-title" and contains (text(), "Log in")]'
  );
  public readonly emailField: Locator = this.page.locator('//*[@id="signinEmail"]');
  public readonly passwordField: Locator = this.page.locator('//*[@id="signinPassword"]');
  public readonly registerButton: Locator = this.page.locator('//button[contains(text(), "Login")]');

  async enterEmail(email: string): Promise<any> {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string): Promise<any> {
    await this.passwordField.fill(password);
  }

  async clickLoginButton(): Promise<any> {
    await this.registerButton.click();
  }

  async loginUser(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
