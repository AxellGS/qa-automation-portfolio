import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'e2e-chromium',
      testDir: './tests/e2e',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com'
      },
    },
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: { 
        baseURL: 'https://dummyjson.com'
      },
    },
  ],
});
