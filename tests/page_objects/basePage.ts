
import { Page, Locator } from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Logs a warning message to the console when a selector fails to match any elements.
     * @param selector - The CSS selector that did not match any element.
     */
    private warnMissing(selector: string): void {
        console.warn(`Selector not found: ${selector}`);
    }


    /**
     * Returns a locator for the given selector.
     * @param selector - The CSS selector of the element.
     * @returns The Playwright Locator.
     */
    async el(selector: string): Promise<Locator | null> {
        try {
            return this.page.locator(selector);
        } catch (err) {
            console.warn(`Failed to create locator: ${selector}\n`, err);
            return null;
        }
    }

    /**
     * Utility wrapper to handle locator lookup and action execution.
     * Keeps existing methods clean and prevents duplicate null checks.
     */
    private async withLocator<T>(selector: string,action: (locator: Locator) => Promise<T>): Promise<T | false> {
        const locator = await this.el(selector);
        
        if (!locator) {
            return false;
        }

        try {
            return await action(locator);
        } catch (err) {
            console.warn(`Action failed on: ${selector}\n`, err);
            return false;
        }
    }

    /**
     * Clicks on the element specified by the selector.
     * @param selector - The CSS selector of the element to click.
     * @param waitAfterMs - Optional delay after click.
     * @returns True if click was successful, false otherwise.
     */
    async click(selector: string, waitAfterMs: number = 0): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.waitFor({ state: "visible" });
            await locator.click();

            if (waitAfterMs > 0) {
                await this.page.waitForTimeout(waitAfterMs);
            }

            return true;
        }) as Promise<boolean>;
    }

    /**
     * Fills the input field with the specified value.
     * @param selector - The CSS selector of the input field.
     * @param value - The value to fill.
     * @returns True if successful, false otherwise.
     */
    async fillInput({ selector, value }: { selector: string; value: any; }): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            await locator.fill(value);
            return true;
        }) as Promise<boolean>;
    }

    /**
     * Checks the checkbox if not already checked.
     * @param selector - The CSS selector of the checkbox.
     * @returns True if successful, false otherwise.
     */
    async check(selector: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            if (!(await locator.isChecked())) {
                await locator.check({ force: true });
            }
            return true;
        }) as Promise<boolean>;
    }

    /**
     * Unchecks the checkbox if not already unchecked.
     * @param selector - The CSS selector of the checkbox.
     * @returns True if successful, false otherwise.
     */
    async uncheck(selector: string): Promise<boolean> {
        return this.withLocator(selector, async (locator) => {
            if (await locator.isChecked()) {
                await locator.uncheck({ force: true });
            }
            return true;
        }) as Promise<boolean>;
    }

    /**
     * Verifies if the element is visible.
     * @param selector - The CSS selector of the element.
     * @returns True if visible, false otherwise.
     */
    async isVisible(selector: string): Promise<boolean> {
        return this.withLocator(selector, (locator) => locator.isVisible()) as Promise<boolean>;
    }


    /**
     * Retrieves the text content or input value of an element.
     * Works for both text elements and form inputs (input, textarea, select).
     * @param selector - The CSS selector of the target element.
     * @returns The text content or input value, or empty string if not found.
     */
    async getText(selector: string): Promise<string> {
        return (await this.withLocator(selector, async (locator) => {
            const tagName = await locator.evaluate(el => el.tagName.toLowerCase());

            if (["input", "textarea", "select"].includes(tagName)) {
                return await locator.inputValue();
            } else {
                return (await locator.textContent())?.trim() ?? "";
            }
        })) as string;
    }

    /**
     * Retrieves the value of an attribute for the element.
     * @param selector - The CSS selector of the element.
     * @param attribute - The attribute name.
     * @returns The attribute value, or empty string if not found.
     */
    async getAttribute(selector: string, attribute: string): Promise<string> {
        return (await this.withLocator(selector, async (locator) => {
            return (await locator.getAttribute(attribute)) ?? "";
        })) as string;
    }

    /**
     * Gets the computed style property value of the element.
     * @param selector - The CSS selector of the element.
     * @param property - The CSS property name.
     * @returns The property value, or empty string if not found.
     */
    async getElementCssProperty(selector: string, property: string): Promise<string> {
        const locator = await this.el(selector);
        if (!locator) {
            return "";
        }
        try {
            return await locator.evaluate((el, prop) =>
                window.getComputedStyle(el as HTMLElement).getPropertyValue(prop as string),
                property
            );
        } catch (err) {
            console.warn(`Failed to get CSS property: ${property} from ${selector}\n`, err);
            return "";
        }
    }

    /**
     * Sets an attribute value on the element.
     * @param selector - The CSS selector of the element.
     * @param attribute - The attribute name.
     * @param value - The value to set.
     * @returns True if successful, false otherwise.
     */
    async setAttributeVal(selector: string, attribute: string, value: string): Promise<boolean> {
        const locator = await this.el(selector);
        if (!locator) {
            return false;
        }
        try {
            await locator.evaluate(
                (el, { attribute, value }) => (el as HTMLElement).setAttribute(attribute, value),
                { attribute, value }
            );
            return true;
        } catch (err) {
            console.warn(`Failed to set attribute: ${attribute} on ${selector}\n`, err);
            return false;
        }
    }

    /**
     * Scrolls the element into view if needed.
     * @param selector - The CSS selector of the element.
     * @returns True if successful, false otherwise.
     */
    async scrollIntoView(selector: string): Promise<boolean> {
        const locator = await this.el(selector);
        if (!locator) {
            return false;
        }
        try {
            await locator.scrollIntoViewIfNeeded();
            return true;
        } catch (err) {
            console.warn(`Failed to scroll into view: ${selector}\n`, err);
            return false;
        }
    }

    /**
     * Moves the mouse cursor to the center of the specified element and optionally drags it by a given offset.
     * @param selector - CSS selector used to locate the target element.
     * @param pixelsToMoveX - Number of pixels to move horizontally from the element's center (default is 0).
     * @param pixelsToMoveY - Number of pixels to move vertically from the element's center (default is 0).
     * @param pressMouseBeforeMove - If true, simulates a mouse press before moving (for drag-and-drop interactions).
     * @returns A Promise that resolves to true if the movement succeeds, or false if the element is not found or fails to move.
     */
    async moveMouseInBoxedElement(
        selector: string, pixelsToMoveX: number = 0, pixelsToMoveY: number = 0, pressMouseBeforeMove: boolean = false): Promise<boolean> {
            return this.withLocator(selector, async (locator) => {
                const box = await locator.boundingBox();
                if (!box) {
                    console.warn(`No bounding box for ${selector}`);
                    return false;
                }

                const centerX = box.x + box.width / 2;
                const centerY = box.y + box.height / 2;
                await this.page.mouse.move(centerX, centerY, { steps: 20 });

                if (pressMouseBeforeMove) {
                    await this.page.mouse.down();
                    await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
                    await this.page.mouse.up();
                } else {
                    await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
                }

                return true;
            }) as Promise<boolean>;
    }


    /**
     * Presses a keyboard key on a specific element or the currently focused element.
     * @param key - The name of the key to press (e.g., 'Enter', 'Escape').
     * @param selector - Optional. If provided, presses the key on that element. Otherwise, uses page-level keyboard.
     * @returns A Promise that resolves to true if the key was pressed successfully, false otherwise.
     */
    async pressKeyboardKey(key: string, selector?: string): Promise<boolean> {
        try {
            if (selector) {
                const locator = await this.el(selector);
                if (!locator){
                    return false;
                }

                await locator.waitFor({ state: "visible" });
                await locator.press(key);
            } else {
                await this.page.keyboard.press(key);
            }

            return true;
        } catch (err) {
            console.warn(`Failed to press key "${key}"${selector ? ` on ${selector}` : ""}\n`, err);
            return false;
        }
    }

    /**
     * Waits for an element to become visible.
     * @param selector - The CSS selector to wait for.
     * @param timeout - Maximum wait time in milliseconds (default 5000).
     * @returns A Promise that resolves to true if element becomes visible, false if timeout.
     */
    async waitForVisible(selector: string, timeout: number = 5000): Promise<boolean> {
        try {
            await this.page.locator(selector).waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            this.warnMissing(selector);
            return false;
        }
    }

    
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
        if (waitForNewTab && clickSelector) {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                this.click(clickSelector)
            ]);

            await newPage.waitForLoadState();
            return await newPage.title();
        }

        return this.page.title();
    }


    /**
     * Gets the current URL of the page.
     * Waits for a short time to ensure the page is fully loaded.
     * @returns A Promise that resolves to the current URL of the page.
     */
    async getPageUrl(): Promise<string> {
        await this.page.waitForTimeout(500); //Assertions may fail if the page is not fully loaded
        return this.page.url();
    }



    //Not In Use
    private async highlight(selector: string, color: string): Promise<void> {
        await this.page.locator(selector).evaluate((el, color) => {
            el.style.boxShadow = `0 0 10px 3px ${color}`;
            el.style.transition = "all 0.3s ease";
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, color);
    }

    private async removeHighlight(selector: string) : Promise<void>{
        await this.page.locator(selector).evaluate((el) => {
            el.style.boxShadow = "";
            el.style.outline = "";
        });
    }
}

