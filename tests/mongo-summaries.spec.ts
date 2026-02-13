import { test, expect } from "@playwright/test";

test.describe("MongoDB Summaries — API Auth Guards", () => {
  test("POST /api/summaries/save returns 401 without auth", async ({
    page,
  }) => {
    const response = await page.request.post("/api/summaries/save", {
      data: {
        summary: "This is a test summary about AI.",
        videoUrl: "https://youtube.com/watch?v=test",
      },
    });
    expect(response.status()).toBe(401);
  });

  test("GET /api/summaries returns 401 without auth", async ({ page }) => {
    const response = await page.request.get("/api/summaries");
    expect(response.status()).toBe(401);
  });

  test("POST /api/summaries/save returns valid JSON error without auth", async ({
    page,
  }) => {
    const response = await page.request.post("/api/summaries/save", {
      data: {
        summary: "test",
        videoUrl: "https://youtube.com/watch?v=test",
      },
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBeTruthy();
  });

  test("POST /api/summaries/save with empty body returns non-200", async ({
    page,
  }) => {
    const response = await page.request.post("/api/summaries/save", {
      data: {},
    });
    // Auth check comes first, so expect 401
    expect(response.status()).not.toBe(200);
  });
});

test.describe("MongoDB Summaries — Page Auth Guard", () => {
  test("Unauthenticated access to sol-summarise redirects to login", async ({
    page,
  }) => {
    await page.goto("/sol-summarise");
    await page.waitForURL("**/login", { timeout: 10000 });
    expect(page.url()).toContain("/login");
  });
});
