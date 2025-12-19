import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class FeaturesMenuPage extends BasePage {

    constructor(page: Page){
        super(page);
    };

    async goToMenuPage(category: string, subCategory: string, expectedRes?: string): Promise<void> {
        const categorySelector = `a[title="${category}"]`;
        const subCategorySelector = `a:has-text("${subCategory}")`;
        await this.click(categorySelector);
        await this.click(subCategorySelector);
        const url = await this.navigation.getPageUrl();
        expect(url).toContain(expectedRes);
    };
};
