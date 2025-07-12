import test, { expect } from 'playwright/test';
import UsersController from '../../api/controllers/UsersController';
import AuthController from '../../api/controllers/AuthController';
import { usersList } from '../../test-data/users';

test.describe('Delete users', () => {
  let usersController: UsersController;
  let authController: AuthController;

  test.beforeEach(({ request }) => {
    usersController = new UsersController(request);
    authController = new AuthController(request);
  });

  test('Delete main user', async () => {
    const sid = await authController.getAuthCookie(usersList.registeredUser.email, usersList.registeredUser.password);
    const response = await usersController.deleteUser(sid);
    expect(response.status()).toBe(200);
  });
});
