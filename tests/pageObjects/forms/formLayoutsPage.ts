import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";


export class FormLayoutsPage extends BasePage {
    
    constructor(page: Page) {
        super(page);
    };

    async goToFormLayoutsPage(): Promise<void> {
        await this.click(`a[title="Forms"]`);
        await this.click(`a:has-text("Form Layouts")`, this.HALF_SEC);
    };

    async submitForm(config): Promise<void> {
        const formSelector = `nb-card:has-text("${config.title}")`;
        for (const [placeholder, value] of Object.entries(config.fields)) {
            await this.fillInput(
                `${formSelector} input[placeholder="${placeholder}"], ${formSelector} textarea[placeholder="${placeholder}"]`,
                value
            );
        };

        if (config.checkbox) {
            await this.check(`${formSelector} nb-checkbox :text-is("${config.checkbox}")`);
        };
        if (config.radio) {
            await this.click(`${formSelector} nb-radio :text-is("${config.radio}")`);
        };

        await this.click(`${formSelector} button:has-text("${config.button}")`);
        const classAttr = await this.attributes.getAttribute(`${formSelector} form`, "class");
        expect(classAttr).toContain("ng-submitted");
    };
};