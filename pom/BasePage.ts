import { expect, Page } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyErrorIsDisplayed(errorText: string) {
    await expect(
      this.page.locator(`xpath=//*[@class='invalid-feedback' and contains(., '${errorText}')]`)
    ).toBeVisible();
  }
}
