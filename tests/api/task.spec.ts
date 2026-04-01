import { test, expect } from "@playwright/test";

test("Get task", async ({ request }) => {
  const response = await request.get("v1/tasks");
  const responseObject = await response.json();

  expect(response.status()).toBe(200);
  console.log(responseObject);
});

test("Post task", async ({ request }) => {
  const response = await request.post("v1/tasks", {
    headers: {
      Authorization: "test",
    },
    data: {
      title: "Deploy test to Railway.app",
      description: "Set up Railway deployment with Docker",
      status: "TODO",
      priority: "HIGH",
      dueDate: "2026-03-21",
      labels: [],
      comments: [],
      createdAt: "2026-03-07T08:10:33.831132",
      updatedAt: "2026-03-07T08:10:33.831132",
    },
  });

  const responseObject = await response.json();
  const createdID = responseObject.id;

  expect(response.status()).toBe(201);
  expect(responseObject.title).toBe("Deploy test to Railway.app");
  console.log(createdID);
  const deletedResponse = request.delete(`v1/tasks/${createdID}`);

  expect((await deletedResponse).status()).toBe(204);
});
