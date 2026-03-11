import { test, expect } from '@fixtures/baseTest';
import { faker } from '@faker-js/faker';

test.describe('SauceDemo Checkout Tests', () => {

  test.beforeEach(async ({ standardUserPage, cartPage }) => {
    await standardUserPage.addProductToCart(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
  });

  test('should show error when submitting empty user information', async ({ checkoutPage }) => {
    await checkoutPage.continueToOverview();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
  });

  test('should complete a successful checkout workflow', async ({ checkoutPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipCode = faker.location.zipCode();

    await checkoutPage.fillPersonalInformation(firstName, lastName, zipCode);
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.subtotalLabel).toBeVisible();

    await checkoutPage.finishCheckout();
    await expect(checkoutPage.page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
