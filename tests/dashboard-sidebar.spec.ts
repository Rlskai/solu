import { test, expect } from "@playwright/test";

test.describe("Dashboard Sidebar", () => {
  test("login page renders correctly", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByTestId("google-signin-btn")).toBeVisible();
  });

  test("unauthenticated dashboard access redirects to login", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain("/login");
  });
});
