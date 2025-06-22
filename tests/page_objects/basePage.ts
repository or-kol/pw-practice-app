import { Page } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async click(selector: string) {
        //await this.highlight(selector, 'yellow');
        await this.page.waitForTimeout(300);
        await this.page.locator(selector).click();
    }

    async fill(selector: string, value: string) {
        await this.highlight(selector, 'orange');
        await this.page.locator(selector).fill(value);
    }

    async getText(selector: string) {
        return await this.page.locator(selector).textContent() || "";
    }

    async isVisible(selector: string) {
        return await this.page.locator(selector).isVisible();
    }

    async getAttribute(selector: string, attribute: string) {
        return await this.page.locator(selector).getAttribute(attribute) || "";
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


