import { test, expect } from '@fixtures/baseTest';

test.describe('SauceDemo Cart Tests', () => {

  test('should display empty cart initially', async ({ standardUserPage, cartPage }) => {
    await cartPage.goto();
    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(0);
  });

  test('should increase badge and add item to cart list', async ({ standardUserPage, cartPage }) => {
    await standardUserPage.addProductToCart(0);
    await standardUserPage.addProductToCart(1);

    await expect(standardUserPage.shoppingCartBadge).toHaveText('2');

    await cartPage.goto();
    const count = await cartPage.getCartItemsCount();
    expect(count).toBe(2);
  });

  test('should remove item from cart and update badge', async ({ standardUserPage, cartPage }) => {
    await standardUserPage.addProductToCart(0);
    await cartPage.goto();

    let count = await cartPage.getCartItemsCount();
    expect(count).toBe(1);

    await cartPage.removeItem(0);

    count = await cartPage.getCartItemsCount();
    expect(count).toBe(0);
    await expect(standardUserPage.shoppingCartBadge).toBeHidden();
  });
});
