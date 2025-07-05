import { test as base, Page } from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';

type MyFixtures = {
  garagePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
  garagePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'test-data/states/mainUserState.json',
    });
    const page = await context.newPage();

    const garagePage = new GaragePage(page);

    await garagePage.open();
    await garagePage.verifyPageIsOpened();

    await use(garagePage);

    await context.close();
  },
});

export { expect } from '@playwright/test';
