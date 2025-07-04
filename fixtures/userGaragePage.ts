import { test as base, Page } from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';

type MyFixtures = {
  garagePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
  garagePage: async ({ page }, use) => {
    await page.context().storageState({ path: '../test-data/states/mainUserState.json' });
    let garagePage = new GaragePage(page);
    await garagePage.open();
    await garagePage.verifyPageIsOpened();
    await use(garagePage);
  },
});

export { expect } from '@playwright/test';
