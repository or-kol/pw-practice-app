import { test as base, expect } from "@playwright/test";

// Extend Playwright test with custom browser setup
export const test = base.extend({
    page: async ({ browser, browserName }, use) => {
        // Create context with custom viewport
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            deviceScaleFactor: 1
        });

        const page = await context.newPage();

        // Set fullscreen window (CDP is Chromium-only).
        if (browserName === 'chromium') {
            const session = await context.newCDPSession(page);
            const { windowId } = await session.send("Browser.getWindowForTarget");
            await session.send("Browser.setWindowBounds", {
                windowId,
                bounds: { windowState: "fullscreen" },
            });
        }

        // Navigate to app
        // WebKit can be slow to fire the full "load" event; domcontentloaded is enough for our SPA.
        const navigationTimeoutMs = browserName === 'webkit' ? 60_000 : 30_000;
        await page.goto("http://localhost:4200/", {
            waitUntil: 'domcontentloaded',
            timeout: navigationTimeoutMs,
        });

        await use(page);
        await context.close();
    },
});

export { expect };