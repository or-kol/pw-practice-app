import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";


export class HomePageFooter extends BasePage{
    constructor(page: Page){
        super(page)
    };

    async rightsReservedText(): Promise<void> {
        const rightsTextLocator = `ngx-footer .created-by`;
        const rightsText = await this.getText(rightsTextLocator);
        expect(rightsText).toBe(`Created with ♥ by Akveo 2019`);
    };

    async urlAvecoFunctionality(): Promise<void> {
        const urlLocator = `ngx-footer .created-by b a`;
        const pageTitle = await this.navigation.getPageTitle(true, urlLocator);
        expect(pageTitle).toBe(`Software Development, Design & Consulting | Akveo`);
    };

    async socialButtonsFunctionality(socialNetwork: string): Promise<void> {
        const buttonLocator = `ngx-footer .socials .ion-social-${socialNetwork}`;
        const pageTitle = await this.navigation.getPageTitle(true, buttonLocator);
        expect(pageTitle).toBe(`playwright-test-admin Demo Application`);
    };
};