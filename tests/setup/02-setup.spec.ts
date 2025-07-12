import test, { expect } from 'playwright/test';
import UsersController from '../../api/controllers/UsersController';
import { UsersFactory } from '../../api/factory/UsersFactory';
import { usersList } from '../../test-data/users';

test.describe('Create users', () => {
  let usersController: UsersController;

  test.beforeEach(({ request }) => {
    usersController = new UsersController(request);
  });

  test('Create main user', async () => {
    const user = UsersFactory.createUser(
      usersList.registeredUser.name,
      usersList.registeredUser.lastName,
      usersList.registeredUser.email,
      usersList.registeredUser.password,
      usersList.registeredUser.password
    );
    const { name, lastName, email, password, repeatPassword } = user;
    const response = await usersController.registerUser(name, lastName, email, password, repeatPassword);
    expect(response.status()).toBe(201);
  });
});
