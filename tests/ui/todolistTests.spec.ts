import { test, expect } from "@playwright/test";
import { todoPage } from "../pages/todolistPage.ts";

let toDoPage: todoPage;

test.beforeEach(async ({ page }) => {
  toDoPage = new todoPage(page);
  await page.goto("https://demo.playwright.dev/todomvc/#/");
});

test("Create a todo task", async ({ page }) => {
  await toDoPage.enterToDoTask("test");
  await expect(page.getByTestId("todo-title").getByText("test")).toBeVisible();
});

test("Complete a todo task", async ({ page }) => {
  await toDoPage.enterToDoTask("test");
  await toDoPage.clickCheckMarkOnTask();
  await toDoPage.clickOnCompleted();

  await expect(page.getByTestId("todo-title").getByText("test")).toBeVisible();
});
