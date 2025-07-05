import { test } from '@playwright/test';
import { usersList } from '../../test-data/users';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import SignInForm from '../../pom/forms/SignInForm';
let homePage: HomePage;
let garagePage: GaragePage;
let signInForm: SignInForm;

test.describe('Login and save user state', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    garagePage = new GaragePage(page);
    signInForm = new SignInForm(page);

    await homePage.open();
    await homePage.clickSignInButton();
  });

  test('Successful sign in', async ({ page }) => {
    await signInForm.loginUser(usersList.registeredUser.email, usersList.registeredUser.password);
    await garagePage.verifyPageIsOpened();
    await page.context().storageState({ path: 'test-data/states/mainUserState.json' });
  });
});
