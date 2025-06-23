import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    private async el(selector: string): Promise<Locator | null> {
        const locator = this.page.locator(selector);
        const count = await locator.count();

        if (count === 0) {
            console.warn(`Element not found for selector: ${selector}`);
            return null;
        }

        return locator;
    }
    
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async click(selector: string): Promise<boolean> {
        await this.page.waitForTimeout(300);
        const locator = await this.el(selector);

        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return false;
        }

        await locator.click();
        return true;
    }

    async check(selector: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return false;
        }

        if (!(await locator.isChecked())) {
            await locator.check({ force: true });
        }

        return true;
    }

    async uncheck(selector: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return false;
        }

        if (await locator.isChecked()) {
            await locator.uncheck({ force: true });
        }

        return true;
    }

    async isChecked(selector: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return false;
        }

        return await locator.isChecked();
    }

    async fill(selector: string, value: string): Promise<boolean> {
        const locator = await this.el(selector);

        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return false;
        }

        await locator.fill(value);
        return true;
    }

    async getText(selector: string): Promise<string> {
        const locator = await this.el(selector);
        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return "";
        }
        return (await locator.textContent()) || "";
    }

    async isVisible(selector: string): Promise<boolean> {
        const locator = await this.el(selector);
        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return false;
        }
        return await locator.isVisible();
    }

    async getAttribute(selector: string, attribute: string): Promise<string> {
        const locator = await this.el(selector);

        if (!locator) {
            console.warn(`Selector not found: ${selector}`);
            return "";
        }

        return (await locator.getAttribute(attribute)) || "";
    }

    async getPageTitle(){
        return await this.page.title();
    }

    async getPageUrl(){
        await this.page.waitForTimeout(300);
        return this.page.url();
    }



    private async highlight(selector: string, color: string) {
        await this.page.locator(selector).evaluate((el, color) => {
            el.style.boxShadow = `0 0 10px 3px ${color}`;
            el.style.transition = "all 0.3s ease";
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, color);
    }

    private async removeHighlight(selector: string) {
        await this.page.locator(selector).evaluate(el => {
            el.style.boxShadow = '';
            el.style.outline = '';
        });
    }



}


