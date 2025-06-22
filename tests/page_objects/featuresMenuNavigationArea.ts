import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FeatursMenuPage extends BasePage {

    constructor(page: Page){
        super(page);
    };

    async goToMenuPage(category: string, subCategory: string, expectedRes: string) {
        await this.click(`a[title="${category}"]`);
        await this.click(`a:has-text("${subCategory}")`);
        return (await this.getPageUrl()).includes(expectedRes);
    };
};
