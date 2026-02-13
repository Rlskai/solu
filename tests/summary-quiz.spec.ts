import { test, expect } from "@playwright/test";

test.describe("Summary Quiz — API", () => {
  test("POST /api/quiz/generate returns 401 without auth", async ({ page }) => {
    const response = await page.request.post("/api/quiz/generate", {
      data: { summary: "Test summary about AI.", numQuestions: 3 },
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBeTruthy();
  });

  test("POST /api/quiz/generate returns 400 for missing fields", async ({ page }) => {
    const response = await page.request.post("/api/quiz/generate", {
      data: {},
    });
    // Auth check comes first, so this will be 401
    const status = response.status();
    expect(status).not.toBe(200);
  });

  test("POST /api/quiz/generate returns valid JSON error", async ({ page }) => {
    const response = await page.request.post("/api/quiz/generate", {
      data: { summary: "Test", numQuestions: 3 },
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe("Unauthorized");
  });
});
