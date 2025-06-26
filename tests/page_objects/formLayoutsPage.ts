import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import type { FormType } from "../types/formType";

export class FormLayoutsPage extends BasePage {
    
    constructor(page: Page) {
        super(page);
    }

    async submitForm(config: FormType): Promise<boolean> {
        const formLocator = `nb-card:has-text("${config.title}")`;

        for (const [placeholder, value] of Object.entries(config.fields)) {
            const success = await this.fill(
                `${formLocator} input[placeholder="${placeholder}"], ${formLocator} textarea[placeholder="${placeholder}"]`, value
            );

            if (!success) {
                return false;
            }
        }

        if (config.checkbox) {
            const checked = await this.check(`${formLocator} nb-checkbox :text-is("${config.checkbox}")`);

            if (!checked) {
                return false;
            }
        }

        if (config.radio) {
            const clicked = await this.click(`${formLocator} nb-radio :text-is("${config.radio}")`);
            
            if (!clicked) {
                return false;
            }
        }

        const submitted = await this.click(`${formLocator} button:has-text("${config.button}")`);
        
        if (!submitted) {
            return false;
        }

        const classAttr = await this.getAttribute(`${formLocator} form`, "class");
        return classAttr?.includes("ng-submitted") ?? false;
    }
}