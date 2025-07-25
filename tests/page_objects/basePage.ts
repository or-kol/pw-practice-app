import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected page: Page;

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
     * Retrieves a Locator for the specified selector if it exists on the page.
     * Logs a warning and returns null if the selector does not match any elements.
     * @param selector - The CSS selector used to locate the element.
     * @returns A Promise that resolves to the Locator or null.
     */
    private async el(selector: string): Promise<Locator | null> {
        const locator = this.page.locator(selector);
        const count = await locator.count();

        if (count === 0) {
            this.warnMissing(selector);
            return null;
        }

        return locator;
    }



    /**
     * Navigates to the specified URL.
     * @param url - The URL to navigate to.
     */
    async navigateTo(url: string): Promise<void> {
        try {
            await this.page.goto(url);
        } catch (err) {
            console.warn(`Failed to navigate to: ${url}\n`, err);
        }
    }


    
    /**
     * Clicks on the element specified by the selector.
     * @param selector - The CSS selector of the element to click.
     * @returns A Promise that resolves to true if the click was successful, false otherwise.
     */
    async click(selector: string, waitAfterMs: number = 0): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator) {
            return false;
        }

        try {
            await locator.waitFor({ state: "visible" });
            await locator.click();
            
            if (waitAfterMs > 0) {
                await this.page.waitForTimeout(waitAfterMs);
            }

            return true;
        } catch (err) {
            console.warn(`Failed to click: ${selector}\n`, err);
            return false;
        }
    }


    /**
     * Retrieves the text value of the selected element.
     * @param selector - The CSS selector of the target element.
     * @returns A Promise that resolves to the element's text content or an empty string if not found.
     */
    async getText(selector: string): Promise<string> {
        try {
            const locator = await this.el(selector);

            if (!locator) {
                console.warn(`Locator not found for selector: ${selector}`);
                return "";
            }

            try {
                await locator.waitFor({ state: "visible", timeout: 3000 });
            } catch {
                console.warn(`Element '${selector}' not visible after 3s — falling back to attached.`);
                await locator.waitFor({ state: "attached", timeout: 1000 });
            }

            const tagName = await locator.evaluate(el => el.tagName.toLowerCase());

            const value = ["input", "textarea", "select"].includes(tagName)
                ? await locator.inputValue()
                : (await locator.textContent())?.trim() ?? "";

            return value;
        } catch (err: any) {
            console.warn(`getText failed for selector '${selector}': ${err?.message || err}`);
            return "";
        }
    }



    /**
     * Checks or unchecks a checkbox or radio button specified by the selector.
     * @param selector - The CSS selector of the checkbox or radio button.
     * @returns A Promise that resolves to true if the action was successful, false otherwise.
     */
    async check(selector: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator){
            return false;
        }

        if (!(await locator.isChecked())) {
            await locator.check({ force: true });
        }

        return true;
    }


    /**
     * Unchecks a checkbox or radio button specified by the selector.
     * @param selector - The CSS selector of the checkbox or radio button.
     * @returns A Promise that resolves to true if the action was successful, false otherwise.
     */
    async uncheck(selector: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator){
            return false;
        }

        if (await locator.isChecked()) {
            await locator.uncheck({ force: true });
        }

        return true;
    }


    /**
     * Checks if a checkbox or radio button is checked.
     * @param selector - The CSS selector of the checkbox or radio button.
     * @returns A Promise that resolves to true if checked, false otherwise.
     */
    async isChecked(selector: string): Promise<boolean> {
        const locator = await this.el(selector);
        return locator ? await locator.isChecked() : false;
    }

    /**
     * Fills the selected input field with the provided value.
     * @param selector - The CSS selector of the input element.
     * @param value - The string to input into the field.
     * @returns A Promise that resolves to true if filled successfully, false otherwise.
     */
    async fill(selector: string, value: string): Promise<boolean> {
        const locator = await this.el(selector);
        if (!locator){
            return false;
        }

        try {
            await locator.fill(value);
            return true;
        } catch (err) {
            console.warn(`Failed to fill ${selector} with "${value}"\n`, err);
            return false;
        }
    }


    /**
     * Checks if an element specified by the selector is visible.
     * @param selector - The CSS selector of the element.
     * @returns A Promise that resolves to true if the element is visible, false otherwise.
     */
    async isVisible(selector: string): Promise<boolean> {
        const locator = await this.el(selector);
        return locator ? await locator.isVisible() : false;
    }


    /**
     * Gets the value of a specified attribute from the element.
     * @param selector - The CSS selector of the element.
     * @param attribute - The name of the attribute to retrieve.
     * @returns A Promise that resolves to the value of the attribute, or an empty string if not found.
     */
    async getAttribute(selector: string, attribute: string): Promise<string> {
        const locator = await this.el(selector);
        if (!locator) {
            return ""
        };

        try {
            return (await locator.getAttribute(attribute)) ?? "";
        } catch (err) {
            console.warn(`Failed to get attribute "${attribute}" from ${selector}\n`, err);
            return "";
        }
    }


    /**
     * Gets the title of the current page.
     * Waits for a short time to ensure the page is fully loaded.
     * @returns A Promise that resolves to the title of the page.
     */
    async getPageTitle(): Promise<string> {
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


    /**
     * Gets the value of a specified CSS property from the element.
     * @param selector - The CSS selector of the element.
     * @param property - The name of the CSS property to retrieve.
     * @returns A Promise that resolves to the value of the CSS property, or an empty string if not found.
     */
    async getElementCssProperty(selector: string, property: string): Promise<string> {
        const element = await this.el(selector);
        if (!element) {
            return ""
        };

        try {
            return await element.evaluate((el, prop) =>
                window.getComputedStyle(el).getPropertyValue(prop), property
            );
        } catch (err) {
            console.warn(`Failed to get CSS property "${property}" from ${selector}\n`, err);
            return "";
        }
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
     * Safely sets an attribute value on a DOM element using Playwright’s evaluate.
     * @param selector - CSS selector used to locate the target element.
     * @param attribute - The name of the attribute to set.
     * @param value - The value to assign to the attribute.
     * @returns A Promise that resolves to true if the attribute was set successfully, false otherwise.
     */
    async setAttributeVal(selector: string, attribute: string, value: string): Promise<boolean> {
        const element = await this.el(selector);
        if (!element){
            return false;
        }

        try {
            await element.evaluate((node, [attr, val]) => {
                node.setAttribute(attr, val);
            }, [attribute, value]);

            return true;
        } catch (err) {
            console.warn(`Failed to set attribute "${attribute}" on ${selector}\n`, err);
            return false;
        }
    }


    async scrollIntoView (selector: string){
        const element = await this.el(selector);
        if (!element){
            return false;
        }

        try {
            await element.scrollIntoViewIfNeeded()
            return true;
        } catch (err) {
            console.warn(`Failed to scroll on ${selector}\n`, err);
            return false;
        }
    }


    async moveMouseInBoxedElement(selector: string, pixelsToMoveX: number = 0, pixelsToMoveY: number = 0, pressMouseBeforeMove: boolean = false): Promise<boolean> {
        const element = await this.el(selector);
        if (!element) {
            return false
        }

        try {
            const box = await element.boundingBox();
            if (!box) {
                console.warn(`No bounding box for ${selector}`);
                return false;
            }

            const centerX = box.x + (box.width / 2);
            const centerY = box.y + (box.height / 2);
            await this.page.mouse.move(centerX, centerY, { steps: 20 });

            if (pressMouseBeforeMove) {
                await this.page.mouse.down()
                await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
                await this.page.mouse.up()
            }
            else {
                await this.page.mouse.move(centerX + pixelsToMoveX, centerY + pixelsToMoveY, { steps: 20 });
            }

            return true;
        } catch (err) {
            console.warn(`Failed to move mouse on ${selector}\n`, err);
            return false;
        }
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

