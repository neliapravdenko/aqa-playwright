import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class HomePage extends BasePage {
  private readonly signUpButton: Locator = this.page.locator('//button[contains(@class, "hero-descriptor_btn")]');
  private readonly signInButton: Locator = this.page.locator('//button[contains(@class, "header_signin")]');

  async open(): Promise<void> {
    await this.page.goto('');
  }

  async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
  }

  async clickSignInButton(): Promise<void> {
    await this.signInButton.click();
  }
}
