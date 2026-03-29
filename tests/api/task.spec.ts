import { test, expect } from "@playwright/test";

test("Get task", async ({ request }) => {
  const response = await request.get("v1/tasks");
  const responseObject = await response.json();

  expect(response.status()).toBe(200);
  console.log(responseObject);
});
