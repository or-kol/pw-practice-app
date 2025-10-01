import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";


export class FormLayoutsPage extends BasePage {
    
    constructor(page: Page) {
        super(page);
    };

    async goToFormLayoutsPage(): Promise<void> {
        await this.page.click(`a[title="Forms"]`);
        await this.page.click(`a:has-text("Form Layouts")`);
    };

    async submitForm(config): Promise<void> {
        const formLocator = `nb-card:has-text("${config.title}")`;

        for (const [placeholder, value] of Object.entries(config.fields)) {
            await this.fillInput({
                selector: `${formLocator} input[placeholder="${placeholder}"], ${formLocator} textarea[placeholder="${placeholder}"]`,
                value
            });
        };

        if (config.checkbox) {
            await this.check(`${formLocator} nb-checkbox :text-is("${config.checkbox}")`);
        };

        if (config.radio) {
            await this.click(`${formLocator} nb-radio :text-is("${config.radio}")`);
        };

        await this.click(`${formLocator} button:has-text("${config.button}")`);
        const classAttr = await this.attributes.getAttribute(`${formLocator} form`, "class");
        expect(classAttr).toContain("ng-submitted");
    };
};