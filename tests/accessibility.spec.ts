import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

import { getAllPages } from "../tests/utils/getAllPages";

test.describe("WCAG 2.1 AA - ALL PAGES", () => {
  test("scan entire site from sitemap", async ({ page, baseURL }) => {
    const pages = await getAllPages(baseURL!);

    for (const path of pages) {
      await page.goto(path, { waitUntil: "domcontentloaded" });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    }
  });
});
