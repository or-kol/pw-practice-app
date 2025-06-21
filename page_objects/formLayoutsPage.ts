import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FormLayoutsPage extends BasePage {
    
    constructor(page: Page){
        super(page);
    };

    async fillUsingTheGridForm(email: string, password: string) {
        const usingTheGridLocator = "nb-card:has-text('Using The Grid')";
        
        await this.fill(`${usingTheGridLocator} input[placeholder="Email"]`, email);
        await this.fill(`${usingTheGridLocator} input[placeholder="Password"]`, password);
        await this.click(`${usingTheGridLocator} nb-radio :text-is("Option 2")`);
        await this.click(`${usingTheGridLocator} button:has-text("SIGN IN")`);

        return (await this.getAttribute(`${usingTheGridLocator} form`, "class")).includes("ng-submitted");
    };
}


    