import { test, expect } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import { usersList } from '../../test-data/users';
import AuthController from '../../api/controllers/AuthController';

let homePage: HomePage;
let signInForm: SignInForm;
let authController: AuthController;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  signInForm = new SignInForm(page);
});

//Task 1
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

//Task2
test.describe('API requests', () => {
  const newCar = {
    carBrandId: 5,
    carModelId: 21,
    mileage: 333,
  };
  const carWithIncorrectBrand = {
    carBrandId: 10,
    carModelId: 21,
    mileage: 333,
  };
  const carWithoutModel = {
    carBrandId: 10,
    mileage: 333,
  };
  let sid: string;
  test.beforeAll('Log in and get sid cookie', async ({ request }) => {
    authController = new AuthController(request);
    sid = await authController.getAuthCookie(usersList.registeredUser.email, usersList.registeredUser.password);
    expect(sid).not.toBeUndefined();
  });

  test.describe('Positive scenario', () => {
    test('Add new car Fiat Panda [/api/cars]', async ({ request }) => {
      const response = await request.post('/api/cars', {
        data: newCar,
        headers: {
          Cookie: sid,
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(201);
      expect(body.data.carBrandId).toBe(newCar.carBrandId);
      expect(body.data.carModelId).toBe(newCar.carModelId);
      expect(body.data.mileage).toBe(newCar.mileage);
      expect(body.data.initialMileage).toBe(newCar.mileage);
      expect(body.data.brand).toBe('Fiat');
    });
  });

  test.describe('Negative scenarios - verifying 400, 401, 404 codes', () => {
    test('Add new car with incorrect car brand - 404 error [/api/cars]', async ({ request }) => {
      const response = await request.post('/api/cars', {
        data: carWithIncorrectBrand,
        headers: {
          Cookie: sid,
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(404);
      expect(body.status).toBe('error');
      expect(body.message).toBe('Brand not found');
    });
  });

  test('Add new car without auth - 401 error [/api/cars]', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: newCar,
    });
    const body = await response.json();
    expect(response.status()).toBe(401);
    expect(body.status).toBe('error');
    expect(body.message).toBe('Not authenticated');
  });

  test('Add new car without indicating model - 400 error [/api/cars]', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: carWithoutModel,
      headers: {
        Cookie: sid,
      },
    });
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.status).toBe('error');
    expect(body.message).toBe('Car model id is required');
  });
});
