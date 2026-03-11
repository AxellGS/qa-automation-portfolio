import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { USERS } from '@utils/constants';

type PortfolioFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  standardUserPage: InventoryPage;
};

export const test = baseTest.extend<PortfolioFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Stateful fixture: handles login automatically, provides an authenticated InventoryPage
  standardUserPage: async ({ page, loginPage, inventoryPage }, use) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await use(inventoryPage);
  }
});

export { expect } from '@playwright/test';
