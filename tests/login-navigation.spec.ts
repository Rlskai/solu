import { test, expect } from "@playwright/test";

test.describe("Login & CTA Navigation", () => {
  test("login page has a back button linking to landing page", async ({ page }) => {
    await page.goto("/login");
    const backBtn = page.getByTestId("back-btn");
    await expect(backBtn).toBeVisible();
    await expect(backBtn).toHaveAttribute("href", "/");
  });

  test("back button navigates to landing page", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("back-btn").click();
    await page.waitForURL("/", { timeout: 5000 });
    expect(page.url()).toBe("http://localhost:3000/");
  });

  test("navbar Start Creating button links to login", async ({ page }) => {
    await page.goto("/");
    // The button is wrapped in a Link, find the parent anchor
    const link = page.locator("a[href='/login']:has(button:text-is('Start Creating'))");
    await expect(link).toBeVisible();
  });

  test("hero Start creating free button links to login", async ({ page }) => {
    await page.goto("/");
    const link = page.locator("a[href='/login']:has(button:text('Start creating free'))");
    await expect(link).toBeVisible();
  });
});
