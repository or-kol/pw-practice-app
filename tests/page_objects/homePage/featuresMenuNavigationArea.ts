import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class FeaturesMenuPage extends BasePage {

    constructor(page: Page){
        super(page);
    };

    async goToMenuPage(category: string, subCategory: string, expectedRes?: string): Promise<boolean> {
        await this.click(`a[title="${category}"]`);
        await this.click(`a:has-text("${subCategory}")`);
        return (await this.navigation.getPageUrl()).includes(expectedRes);
    };
};
