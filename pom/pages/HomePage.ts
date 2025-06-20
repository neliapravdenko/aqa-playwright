import { Locator } from '@playwright/test';
import BasePage from '../BasePage';

export default class HomePage extends BasePage {
  private readonly signUpButton: Locator = this.page.locator('//button[contains(@class, "hero-descriptor_btn")]');

  async open(): Promise<any> {
    await this.page.goto('');
  }

  async clickSignUpButton(): Promise<any> {
    await this.signUpButton.click();
  }
}
