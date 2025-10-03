import { Page } from "@playwright/test";
import { Logger } from "../logger";
import { LocatorHelper } from "../locatorHelper";

/**
 * NavigationMixin provides page navigation and URL-related functionality
 * including page titles, URLs, and new tab handling
 */
export class NavigationMixin {
    
    constructor(private page: Page) {}

    /**
     * Retrieves the page title from either the current page or a newly opened tab.
     * 
     * - If `waitForNewTab` is `false`, it simply returns the current page's title.
     * - If `waitForNewTab` is `true` and a `clickSelector` is provided, it clicks the element
     *   that opens a new tab, waits for the new tab to load, and returns that tab's title.
     * 
     * @param waitForNewTab - Set to true to wait for and return the title of a new tab.
     * @param clickSelector - CSS selector for the element that opens the new tab (required if `waitForNewTab` is true).
     * @returns A Promise that resolves to the title of the target page.
     */
    async getPageTitle(waitForNewTab: boolean = false, clickSelector?: string): Promise<string> {
        try {
            if (waitForNewTab && clickSelector) {
                const clickResult = await LocatorHelper.withLocator(this.page, clickSelector, async (locator) => {
                    const [newPage] = await Promise.all([
                        this.page.context().waitForEvent('page'),
                        locator.click()
                    ]);

                    await newPage.waitForLoadState();
                    return await newPage.title();
                });

                return clickResult as string || '';
            }

            return this.page.title();
        } catch (error) {
            Logger.logError('Get page title', error);
            return '';
        }
    }

    /**
     * Gets the current URL of the page.
     * Waits for a short time to ensure the page is fully loaded (timeout: 500ms).
     * @returns A Promise that resolves to the current URL of the page.
     * @remarks
     * Uses a short wait to avoid race conditions with navigation.
     */
    async getPageUrl(): Promise<string> {
        try {
            await this.page.waitForTimeout(500);
            return this.page.url();
        } catch (error) {
            Logger.logError('Get page URL', error);
            return '';
        }
    }
}