import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class HomePage extends BasePage {
  private readonly signUpButton: Locator = this.page.locator('//button[contains(@class, "hero-descriptor_btn")]');
  private readonly signInButton: Locator = this.page.locator('//button[contains(@class, "header_signin")]');

  async open(): Promise<void> {
    const baseUrl = process.env.BASE_URL!;
    await this.page.goto(baseUrl);
  }

  async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
  }

  async clickSignInButton(): Promise<void> {
    await this.signInButton.click();
  }
}
