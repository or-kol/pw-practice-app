import { test as base } from '@playwright/test';

export const test = base.extend({
    async page({ browser }, use) {
        const page = await browser.newPage();
        await page.goto('http://localhost:4200/');
        await use(page);
        await page.close();
    },
});
