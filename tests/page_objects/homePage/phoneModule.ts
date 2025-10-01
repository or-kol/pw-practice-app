import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";



export class PhoneModule extends BasePage{

    constructor(page: Page){
        super(page);
    };


    async phoneListsValidation(tabName: string, contactsList: string[]): Promise<void> {
        const tabButtonLocator = `ngx-contacts span:has-text("${tabName}")`;
        const tabListItemLocator = `ngx-contacts [tabtitle="${tabName}"] nb-list`;

        await this.click(tabButtonLocator);

        for (let i = 1; i<=5; i++){
            const contactItem = await this.getText(`${tabListItemLocator} nb-list-item:nth-of-type(${i})`);
            expect(contactItem).toContain(contactsList[i-1]);
        };
    };
};