import { test, expect } from "@playwright/test";

test.describe("SolSummarise", () => {
  test("unauthenticated access redirects to login", async ({ page }) => {
    await page.goto("/sol-summarise");
    await page.waitForURL(/\/login/, { timeout: 10000 });
    expect(page.url()).toContain("/login");
  });

  test("API returns 400 for empty URL", async ({ page }) => {
    const response = await page.request.post("/api/sol-summarise", {
      data: { url: "" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBeTruthy();
  });

  test("API returns 400 for missing body", async ({ page }) => {
    const response = await page.request.post("/api/sol-summarise", {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test("API returns 400 for invalid URL", async ({ page }) => {
    const response = await page.request.post("/api/sol-summarise", {
      data: { url: "not-a-valid-url" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("Failed to download");
  });
});

test.describe("SolSummarise - SSE and format", () => {
  test("Happy - SSE content type, stream steps, and correct format", async ({
    page,
  }) => {
    test.setTimeout(120000);

    const response = await page.request.post("/api/sol-summarise", {
      data: { url: "https://www.youtube.com/watch?v=jNQXAC9IVRw" },
    });

    // Verify Content-Type is text/event-stream
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("text/event-stream");

    // Read the full SSE body
    const body = await response.text();

    // Verify the stream contains all expected step events
    expect(body).toContain('"step":"downloading"');
    expect(body).toContain('"step":"transcribing"');
    expect(body).toContain('"step":"summarising"');
    expect(body).toContain('"step":"done"');

    // Verify each SSE event line matches the expected format: data: {...}\n\n
    const lines = body.split("\n").filter((line: string) => line.trim() !== "");
    for (const line of lines) {
      expect(line).toMatch(/^data: \{.*\}$/);
      // Each data line should be valid JSON after stripping "data: "
      const json = line.slice(6);
      expect(() => JSON.parse(json)).not.toThrow();
    }

    // Verify double-newline delimiters between SSE events (standard SSE format)
    const events = body.split("\n\n").filter((e: string) => e.trim() !== "");
    expect(events.length).toBeGreaterThanOrEqual(4); // downloading, transcribing, summarising, done

    // Verify ordering: downloading -> transcribing -> summarising -> done
    const downloadIdx = body.indexOf('"step":"downloading"');
    const transcribeIdx = body.indexOf('"step":"transcribing"');
    const summariseIdx = body.indexOf('"step":"summarising"');
    const doneIdx = body.indexOf('"step":"done"');

    expect(downloadIdx).toBeLessThan(transcribeIdx);
    expect(transcribeIdx).toBeLessThan(summariseIdx);
    expect(summariseIdx).toBeLessThan(doneIdx);

    // Verify the "done" event includes a non-empty summary field
    const doneEvent = events.find((e: string) => e.includes('"step":"done"'));
    expect(doneEvent).toBeDefined();
    const doneJson = JSON.parse(doneEvent!.replace("data: ", ""));
    expect(doneJson.summary).toBeTruthy();
    expect(typeof doneJson.summary).toBe("string");
    expect(doneJson.summary.length).toBeGreaterThan(0);
  });

  test("Edge - validation errors return JSON content type", async ({
    page,
  }) => {
    const response = await page.request.post("/api/sol-summarise", {
      data: { url: "" },
    });

    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/json");
    // Should NOT be event-stream
    expect(contentType).not.toContain("text/event-stream");
  });

  test("Valid URL returns SSE stream while invalid URL returns JSON", async ({
    page,
  }) => {
    test.setTimeout(180000);

    // A syntactically valid URL that passes URL parsing but points to a
    // non-existent video should still start the SSE stream (then error inside it)
    const response = await page.request.post("/api/sol-summarise", {
      data: { url: "https://www.youtube.com/watch?v=ZZZZZZZZZZ9" },
    });

    // The URL passes validation so we should get an SSE stream, not JSON
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("text/event-stream");

    const body = await response.text();

    // The stream should start with the downloading step
    expect(body).toContain('"step":"downloading"');

    // Since the video doesn't exist, yt-dlp should fail and we should get an error step
    // (it won't reach transcribing/summarising/done)
    expect(body).toContain('"step":"error"');

    // Verify SSE format is still correct even for error events
    const lines = body.split("\n").filter((line: string) => line.trim() !== "");
    for (const line of lines) {
      expect(line).toMatch(/^data: \{.*\}$/);
      const json = line.slice(6);
      expect(() => JSON.parse(json)).not.toThrow();
    }
  });
});
