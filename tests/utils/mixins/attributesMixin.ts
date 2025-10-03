import { Page } from "@playwright/test";
import { LocatorHelper } from "../locatorHelper";

/**
 * AttributesMixin provides DOM manipulation and CSS property access capabilities
 * including getting/setting attributes and reading computed styles
 */
export class AttributesMixin {
    
    constructor(private page: Page) {}

    /**
     * Retrieves the value of an attribute for the element.
     * Waits for the element to be attached to the DOM using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @param attribute - The attribute name.
     * @returns The attribute value, or empty string if not found.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns an empty string if the element or attribute is not found.
     */
    async getAttribute(selector: string, attribute: string): Promise<string> {
        return (await LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: 5000 });
            return (await locator.getAttribute(attribute)) ?? "";
        })) as string || "";
    }

    /**
     * Gets the computed style property value of the element.
     * Waits for the element to be attached to the DOM using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @param property - The CSS property name.
     * @returns The property value, or empty string if not found.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns an empty string if the element or property is not found.
     */
    async getElementCssProperty(selector: string, property: string): Promise<string> {
        return (await LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: 5000 });
            return await locator.evaluate((element, prop) =>
                window.getComputedStyle(element as HTMLElement).getPropertyValue(prop as string),
                property
            );
        })) as string || "";
    }

    /**
     * Sets an attribute value on the element.
     * Waits for the element to be attached to the DOM using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @param attribute - The attribute name.
     * @param value - The value to set.
     * @returns True if successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or the attribute cannot be set.
     */
    async setAttributeVal(selector: string, attribute: string, value: string): Promise<boolean> {
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "attached", timeout: 5000 });
            await locator.evaluate(
                (element, { attribute, value }) => (element as HTMLElement).setAttribute(attribute, value),
                { attribute, value }
            );
            return true;
        });
    }

    /**
     * Scrolls the element into view if needed.
     * Waits for the element to be visible using ACTION_TIMEOUT.
     * @param selector - The CSS selector of the element.
     * @returns True if successful, false otherwise.
     * @remarks
     * Uses ACTION_TIMEOUT for waiting. Logs a warning and returns false if the element is not found or cannot be scrolled into view.
     */
    async scrollIntoView(selector: string): Promise<boolean> {
        return LocatorHelper.withLocator(this.page, selector, async (locator) => {
            await locator.waitFor({ state: "visible", timeout: 5000 });
            await locator.scrollIntoViewIfNeeded();
            return true;
        });
    }
}