import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { time } from "console";


export class HomePageFooter extends BasePage{
    constructor(page: Page){
        super(page)
    };

    async rightsReservedText(): Promise<boolean> {
        const rightsTextLocator = `ngx-footer .created-by`;
        const rightsText = await this.getText(rightsTextLocator);
        return rightsText === `Created with ♥ by Akveo 2019`;
    };

    async urlAvecoFunctionality(): Promise<boolean> {
        const urlLocator = `ngx-footer .created-by b a`;

        const pageTitle = await this.getPageTitle(true, urlLocator);
        console.log(pageTitle);
        return pageTitle === `Software Development, Design & Consulting | Akveo`
    };


    async socialButtonsFunctionality(socialNetwork: string): Promise<boolean> {
        const buttonLocator = `ngx-footer .socials .ion-social-${socialNetwork}`;
        
        const pageTitle = await this.getPageTitle(true, buttonLocator);
        return pageTitle === `playwright-test-admin Demo Application`
    };
};