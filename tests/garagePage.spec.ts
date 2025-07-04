import { test } from '../fixtures/userGaragePage';

test.describe('Adding a car using fixture', () => {
  test('Add Porsche Panamera', async ({ garagePage }) => {
    await garagePage.verifyPageIsOpened();
    await garagePage.addNewCar('Porsche', 'Panamera', '567');
    await garagePage.verifyLastAddedCarName('Porsche Panamera');
  });
});
