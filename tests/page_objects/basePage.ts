import { Locator, Page } from "@playwright/test";
import { promises } from "dns";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private warnMissing(selector: string): void {
        console.warn(`Selector not found: ${selector}`);
    }

    private async el(selector: string): Promise<Locator | null> {
        const locator = this.page.locator(selector);
        const count = await locator.count();

        if (count === 0) {
            this.warnMissing(selector);
            return null;
        }

        return locator;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

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

    async isVisible(selector: string): Promise<boolean> {
        const locator = await this.el(selector);
        return locator ? await locator.isVisible() : false;
    }

    async getAttribute(selector: string, attribute: string): Promise<string> {
        const locator = await this.el(selector);
        return locator ? (await locator.getAttribute(attribute)) ?? "" : "";
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

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

