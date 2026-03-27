import { test, expect } from "@playwright/test";
import { TaskPage } from "../pages/taskmanagerPage.js";
import testData from "../../data/testData.json" assert { type: "json" };

let taskPage;

test.beforeEach(async ({ page }) => {
  taskPage = new TaskPage(page);
  await page.goto("https://testauto.app/task-manager");
});

for (const data of testData) {
  test(`Login as ${data.username} (${data.role})`, async ({ page }) => {
    await taskPage.clickTaskManagerSPA();
    await page.waitForTimeout(2000);
    await taskPage.clickAPI("V2 - JWT Auth");

    await page.waitForTimeout(2000);
    await taskPage.enterLoginInformation(data.username, data.password);
    await page.waitForTimeout(2000);
    await taskPage.clickLogin();

    if (data.shouldPass) {
      await expect(
        page.locator(".user-badge", {
          hasText: `${data.username} (${data.role})`,
        }),
      ).toBeVisible();
    } else {
      await expect(
        page.locator(".error-message", {
          hasText: "An unexpected error occurred: Invalid username or password",
        }),
      ).toBeVisible();
    }
  });
}

test("Create task", async ({ page }) => {
  let title = "automation with playwright";

  await taskPage.clickAddTask();
  await taskPage.filloutTaskInformation(
    title,
    "create automation tests with playwright using typescript/javascript",
    "In Progress",
  );
  await taskPage.searchTaskByName(title);

  await expect(page.locator(".task-title", { hasText: title })).toBeVisible();
});
