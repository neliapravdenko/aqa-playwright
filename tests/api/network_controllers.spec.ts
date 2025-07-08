import { test, expect } from '@playwright/test';
import { usersList } from '../../test-data/users';
import AuthController from '../../api/controllers/AuthController';
import CarsController from '../../api/controllers/CarsController';
import { CarsFactory } from '../../api/factory/CarsFactory';
import ErrorsController from '../../api/controllers/ErrorsController';

let authController: AuthController;
let carsController: CarsController;
let carsControllerInner: CarsController;
let errorsController: ErrorsController;
let carId: number;
let sid: string;

//Task2
test.describe('API requests', () => {
  const newCar = CarsFactory.createCar(5, 21, 333);
  const carWithIncorrectBrand = CarsFactory.createCar(10, 21, 333);
  const carWithoutModel = CarsFactory.createCar(5, undefined, 333);

  test.beforeEach(async ({ request }) => {
    authController = new AuthController(request);
    carsController = new CarsController(request);
    errorsController = new ErrorsController(request);
  });

  test.beforeAll(async ({ request }) => {
    authController = new AuthController(request);
    carsControllerInner = new CarsController(request);
    sid = await authController.getAuthCookie(usersList.registeredUser.email, usersList.registeredUser.password);
    expect(sid).not.toBeUndefined();

    const carToAdd = CarsFactory.createCar(2, 9, 100);
    const createCarForRemoving = await carsControllerInner.addCar(carToAdd, sid);
    const body = await createCarForRemoving.json();

    carId = body.data.id;
    expect(carId).not.toBeUndefined();
  });

  test.describe('Positive scenarios', () => {
    test('get brands [/api/cars/brands]', async () => {
      const response = await carsController.getBrands();
      const body = await response.json();
      expect(response.status()).toBe(200);
    });

    test('get cars [/api/cars]', async () => {
      const response = await carsController.getUserCars(sid);
      const body = await response.json();
      expect(response.status()).toBe(200);
    });

    test('Add new car Fiat Panda [/api/cars]', async () => {
      const response = await carsController.addCar(newCar, sid);
      const body = await response.json();
      expect(response.status()).toBe(201);
      expect(body.data.carBrandId).toBe(newCar.carBrandId);
      expect(body.data.carModelId).toBe(newCar.carModelId);
      expect(body.data.mileage).toBe(newCar.mileage);
      expect(body.data.initialMileage).toBe(newCar.mileage);
      expect(body.data.brand).toBe('Fiat');
    });

    test('Delete car [/api/cars/{id}]', async () => {
      const response = await carsController.deleteCar(carId, sid);
      const body = await response.json();
      expect(body.data.carId).toBe(carId);
      expect(response.status()).toBe(200);
    });
  });

  test.describe('Negative scenarios - verifying 400, 401, 404 codes', () => {
    test('Add new car with incorrect car brand - 404 error [/api/cars]', async ({ request }) => {
      await errorsController.triggerError(carWithIncorrectBrand, sid, 404);
      await errorsController.verifyErrorMessage(carWithIncorrectBrand, 'Brand not found', 404, sid);
    });

    test('Add new car without auth - 401 error [/api/cars]', async ({ request }) => {
      await errorsController.triggerError(newCar, undefined, 401);
      await errorsController.verifyErrorMessage(newCar, 'Not authenticated', 401);
    });

    test('Add new car without indicating model - 400 error [/api/cars]', async ({ request }) => {
      await errorsController.triggerError(carWithoutModel, sid);
      await errorsController.verifyErrorMessage(carWithoutModel, 'Invalid car model type', 400, sid);
    });
  });
});
