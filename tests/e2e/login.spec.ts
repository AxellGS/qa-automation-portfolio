import { test, expect } from '@fixtures/baseTest';

test.describe('SauceDemo Login Tests', () => {

  test('should login successfully with standard user', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'invalid_pass');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface');
  });
});
