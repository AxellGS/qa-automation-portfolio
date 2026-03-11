import { test, expect } from '@fixtures/baseTest';

test.describe('SauceDemo Inventory Tests (Stateful)', () => {

  test('should display 6 items on the inventory page', async ({ standardUserPage }) => {
    const count = await standardUserPage.getProductsCount();
    expect(count).toBe(6);
  });

  test('should add an item to the shopping cart', async ({ standardUserPage }) => {
    await standardUserPage.addProductToCart(0);
    await expect(standardUserPage.shoppingCartBadge).toBeVisible();
    await expect(standardUserPage.shoppingCartBadge).toHaveText('1');
  });

});
