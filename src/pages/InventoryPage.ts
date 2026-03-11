import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly shoppingCartBadge: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async getProductsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addProductToCart(productIndex: number) {
    const btn = this.inventoryItems.nth(productIndex).locator('button');
    await btn.click();
  }
}
