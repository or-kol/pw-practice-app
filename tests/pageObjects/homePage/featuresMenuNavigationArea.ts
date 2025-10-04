import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class FeaturesMenuPage extends BasePage {

    constructor(page: Page){
        super(page);
    };

    async goToMenuPage(category: string, subCategory: string, expectedRes?: string): Promise<void> {
        await this.click(`a[title="${category}"]`);
        await this.click(`a:has-text("${subCategory}")`);
        const url = await this.navigation.getPageUrl();
        expect(url).toContain(expectedRes);
    };
};
