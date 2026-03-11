import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  
  // Step 1: Info
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step 2: Overview
  readonly finishButton: Locator;
  readonly subtotalLabel: Locator;

  // Step 3: Complete
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.finishButton = page.locator('[data-test="finish"]');
    this.subtotalLabel = page.locator('.summary_subtotal_label');

    this.completeHeader = page.locator('.complete-header');
  }

  async fillPersonalInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
