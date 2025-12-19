import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class HomePageFooter extends BasePage{
    
    private readonly CREATED_BY_SELECTOR = `ngx-footer .created-by`;

    constructor(page: Page){
        super(page)
    };

    async rightsReservedText(): Promise<void> {
        
        const rightsText = await this.getText(this.CREATED_BY_SELECTOR);
        expect(rightsText).toBe(`Created with ♥ by Akveo 2019`);
    };

    async urlAvecoFunctionality(): Promise<void> {
        const urlSelector = `${this.CREATED_BY_SELECTOR} b a`;
        const pageTitle = await this.navigation.getPageTitle(true, urlSelector);
        expect(pageTitle).toBe(`Software Development, Design & Consulting | Akveo`);
    };

    async socialButtonsFunctionality(socialNetwork: string): Promise<void> {
        const buttonSelector = `ngx-footer .socials .ion-social-${socialNetwork}`;
        const pageTitle = await this.navigation.getPageTitle(true, buttonSelector);
        expect(pageTitle).toBe(`playwright-test-admin Demo Application`);
    };
};