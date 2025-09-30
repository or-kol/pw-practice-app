import { test as base, expect } from "@playwright/test";

// Extend Playwright test with custom browser setup
export const test = base.extend({
    page: async ({ browser }, use) => {
        // Create context with custom viewport
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            deviceScaleFactor: 1
        });

        const page = await context.newPage();

        // Set fullscreen window
        const session = await context.newCDPSession(page);
        const { windowId } = await session.send("Browser.getWindowForTarget");
        await session.send("Browser.setWindowBounds", {
            windowId,
            bounds: { windowState: "fullscreen" },
        });

        // Navigate to app
        await page.goto("http://localhost:4200/");

        await use(page);
        await context.close();
    },
});

export { expect };