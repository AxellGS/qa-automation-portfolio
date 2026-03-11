import { test, expect } from '@fixtures/baseTest';
import { USERS } from '@utils/constants';

test.describe('SauceDemo Login Tests', () => {

  test('should login successfully with standard user', async ({ loginPage, page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface');
  });
});
