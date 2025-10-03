import { Page, Locator } from "@playwright/test";
import { Logger } from "./logger";

/**
 * LocatorHelper provides centralized locator management and error handling utilities
 * for consistent element interaction patterns across page objects and mixins
 */
export class LocatorHelper {
    /**
     * Returns a Playwright Locator for the given selector with error handling.
     * @param page - The Playwright Page instance.
     * @param selector - The CSS selector of the element.
     * @returns The Playwright Locator, or null if the locator could not be created.
     */
    static async el(page: Page, selector: string): Promise<Locator | null> {
        try {
            return page.locator(selector);
        } catch (err) {
            Logger.logWarning(`Selector not found: ${selector}`);
            return null;
        }
    }

    /**
     * Utility wrapper to handle locator lookup and action execution with consistent error handling.
     * @param page - The Playwright Page instance.
     * @param selector - The CSS selector of the element.
     * @param action - The async function to execute with the locator.
     * @returns The result of the action, or false if the element is not found or the action fails.
     */
    static async withLocator<T>(
        page: Page, 
        selector: string, 
        action: (locator: Locator) => Promise<T>
    ): Promise<T | false> {
        const locator = await LocatorHelper.el(page, selector);
        
        if (!locator) {
            Logger.logWarning(`Selector not found: ${selector}`);
            return false;
        }

        try {
            return await action(locator);
        } catch (err) {
            Logger.logWarning(`Selector not found: ${selector}`);
            return false;
        }
    }
}