import { test, expect } from "@playwright/test";

test.describe("Google OAuth", () => {
  test("login page renders with sign-in button", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "Sign in to Solu" })
    ).toBeVisible();
    await expect(page.getByTestId("google-signin-btn")).toBeVisible();
    await expect(page.getByTestId("google-signin-btn")).toContainText(
      "Sign in with Google"
    );
  });

  test("sign-in button triggers OAuth redirect", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("google-signin-btn").click();
    // Wait for navigation to OAuth provider
    await page.waitForURL(/supabase\.co|accounts\.google\.com/, {
      timeout: 10000,
    });
    const url = page.url();
    expect(url).toMatch(/supabase\.co|accounts\.google\.com/);
  });

  test("unauthenticated dashboard visit redirects to login", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain("/login");
  });

  test("auth callback without code redirects to login", async ({ page }) => {
    await page.goto("/auth/callback");
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain("/login");
  });
});
