import { Page, Locator, expect } from "@playwright/test";

export class todoPage {
  readonly page: Page;
  readonly inputToDoName: Locator;
  readonly inputCheckMark: Locator;
  readonly ahrefCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputToDoName = page.getByPlaceholder("What needs to be done?");
    this.inputCheckMark = page.getByLabel("Toggle Todo").last();
    this.ahrefCompleted = page.getByRole("link", { name: "Completed" });
  }

  async enterToDoTask(text: string) {
    await this.inputToDoName.fill(text);
    await this.page.keyboard.press("Enter");
  }

  async expectToDoToBeVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async clickCheckMarkOnTask() {
    await this.inputCheckMark.click();
  }

  async clickOnCompleted() {
    await this.ahrefCompleted.click();
  }
}
