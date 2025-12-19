import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";


export class FormLayoutsPage extends BasePage {
    private readonly FORM_SELECTOR = (label: string) => `nb-card:has-text("${label}")`;

    constructor(page: Page) {
        super(page);
    };

    async goToFormLayoutsPage(): Promise<void> {
        await this.click(`a[title="Forms"]`);
        await this.click(`a:has-text("Form Layouts")`, this.HALF_SEC);
    };

    async submitForm(config): Promise<void> {

        const formCardSelector = this.FORM_SELECTOR(config.title);
        const formElementSelector = `${formCardSelector} form`;
        const fieldSelector = (placeholder: string) =>
            `${formCardSelector} input[placeholder="${placeholder}"], ${formCardSelector} textarea[placeholder="${placeholder}"]`;
        const checkboxSelector = config.checkbox ? `${formCardSelector} nb-checkbox :text-is("${config.checkbox}")` : undefined;
        const radioSelector = config.radio ? `${formCardSelector} nb-radio :text-is("${config.radio}")` : undefined;
        const submitButtonSelector = `${formCardSelector} button:has-text("${config.button}")`;
        
        for (const [placeholder, value] of Object.entries(config.fields)) {
            await this.fillInput(fieldSelector(placeholder), value);
        };

        if (checkboxSelector) {
            await this.check(checkboxSelector);
        };
        if (radioSelector) {
            await this.click(radioSelector);
        };

        await this.click(submitButtonSelector);
        const classAttr = await this.attributes.getAttribute(formElementSelector, "class");
        expect(classAttr).toContain("ng-submitted");
    };
};