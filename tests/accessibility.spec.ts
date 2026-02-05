import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

import { getAllPages } from "../tests/utils/getAllPages";

test.describe("WCAG 2.1 AA - ALL PAGES", () => {
  // Scanning many pages can exceed the default per-test timeout in CI.
  test.setTimeout(process.env.CI ? 5 * 60_000 : 2 * 60_000);

  test("scan entire site from sitemap", async ({ page, baseURL }) => {
    // Avoid false positives from entrance animations (opacity transitions)
    // and align with reduced-motion accessibility preference during automated audits.
    await page.emulateMedia({ reducedMotion: "reduce" });

    const pages = await getAllPages(baseURL!);

    for (const path of pages) {
      // Give navigation extra time in CI (Vercel cold starts, heavy pages).
      await page.goto(path, {
        waitUntil: "domcontentloaded",
        timeout: process.env.CI ? 120_000 : 60_000,
      });
      // Best-effort: wait for the page to fully settle without making the test hang.
      await page.waitForLoadState("load", { timeout: 30_000 }).catch(() => {});

      // Freeze animations/transitions and force final opacity before running Axe.
      // This prevents color-contrast checks from sampling partially-transparent text
      // during fade-in animations (e.g., Framer Motion initial opacity: 0).
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            transition: none !important;
            animation: none !important;
            caret-color: auto !important;
          }
          [style*="opacity"] { opacity: 1 !important; }
        `,
      });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    }
  });
});
