import { Locator, Page } from "@playwright/test";
import { promises } from "dns";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Logs a warning if the element with the given selector is not found.
     * @param selector - The CSS selector of the element.
     */
    private warnMissing(selector: string): void {
        console.warn(`Selector not found: ${selector}`);
    }
    
    /**
     * Returns a Locator for the given selector.
     * If the element is not found, logs a warning and returns null.
     * @param selector - The CSS selector to locate the element.
     * @returns A Promise that resolves to a Locator or null if not found.
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
        await this.page.goto(url);
    }

    
    /**
     * Clicks on the element specified by the selector.
     * @param selector - The CSS selector of the element to click.
     * @returns A Promise that resolves to true if the click was successful, false otherwise.
     */
    async click(selector: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator){
            return false;
        }

        try {
            await locator.waitFor({ state: "visible" });
            await locator.click();
            return true;
        } catch (err) {
            console.warn(`Failed to click: ${selector}\n`, err);
            return false;
        }
    }


    /**
     * Gets the text content of the element specified by the selector.
     * @param selector - The CSS selector of the element.
     * @returns A Promise that resolves to the text content of the element, or an empty string if not found.
     */
    async getText(selector: string): Promise<string> {
        const locator = await this.el(selector);

        if (!locator){
            return "";
        }

        try {
            await locator.waitFor({ state: "attached" });
            const tagName = await locator.evaluate(el => el.tagName.toLowerCase());

            if (["input", "textarea", "select"].includes(tagName)) {
                return await locator.inputValue();
            } else {
                return (await locator.textContent()) ?? "";
            }
        } catch (err) {
            console.warn(`Failed to get value from: ${selector}\n`, err);
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


    async fill(selector: string, value: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator){
            return false;
        }

        await locator.fill(value);
        return true;
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
        return locator ? (await locator.getAttribute(attribute)) ?? "" : "";
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

