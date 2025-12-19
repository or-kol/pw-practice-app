import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class PhoneModule extends BasePage{

    constructor(page: Page){
        super(page);
    };


    async phoneListsValidation(tabName: string, contactsList: string[]): Promise<void> {
        const tabButtonSelector = `ngx-contacts span:has-text("${tabName}")`;
        const tabListItemSelector = `ngx-contacts [tabtitle="${tabName}"] nb-list`;

        await this.click(tabButtonSelector);

        for (let i = 0; i < contactsList.length; i++) {
            const contactItem = await this.getText(`${tabListItemSelector} nb-list-item:nth-of-type(${i + 1})`);
            expect(contactItem).toContain(contactsList[i]);
        };
    };
};