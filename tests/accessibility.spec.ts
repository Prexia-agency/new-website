import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

import { getAllPages } from "../tests/utils/getAllPages";

test.describe("WCAG 2.1 AA - ALL PAGES", () => {
  test("scan entire site from sitemap", async ({ page, baseURL }) => {
    // Avoid false positives from entrance animations (opacity transitions)
    // and align with reduced-motion accessibility preference during automated audits.
    await page.emulateMedia({ reducedMotion: "reduce" });

    const pages = await getAllPages(baseURL!);

    for (const path of pages) {
      await page.goto(path, { waitUntil: "domcontentloaded" });

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
