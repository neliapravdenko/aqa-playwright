import { test, expect } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import { usersList } from '../../test-data/users';

let homePage: HomePage;
let signInForm: SignInForm;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  signInForm = new SignInForm(page);
});

//Task 1 - Mock request
test.describe('Mock requests', () => {
  test('Mock response body for profile request', async ({ page }) => {
    await homePage.open();
    await homePage.clickSignInButton();
    await signInForm.loginUser(usersList.registeredUser.email, usersList.registeredUser.password);

    const changedUser = {
      userId: 230414,
      photoFilename: 'default-user.png',
      name: 'Stanislav',
      lastName: 'Taran',
    };
    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'ok',
          data: changedUser,
        }),
      });
    });

    const profileLink = page.locator('a[routerlink*="profile"]').nth(1);
    await profileLink.waitFor();
    await profileLink.click();
    expect(page.url()).toBe('https://qauto.forstudy.space/panel/profile');
    await expect(page.locator('//p[@class="profile_name display-4"]')).toHaveText(
      `${changedUser.name} ${changedUser.lastName}`
    );
  });
});
