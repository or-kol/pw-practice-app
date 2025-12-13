import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class ToastrPage extends BasePage{

    private readonly TOAST_CARD_SELECTOR = `ngx-toastr nb-card-body`;
    private readonly TOASTR_SELECTOR = `nb-layout .cdk-overlay-container`;
    private readonly SHOW_TOAST_BUTTON_SELECTOR = `ngx-toastr nb-card-footer button:has-text("Show Toast")`;

    constructor(page: Page){
        super(page);
    };


    async goToToastrPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("toastr")`, this.HALF_SEC);
    };

    async toastPositionValidation(position: string, verticalLocation: string, horizontalLocation: string): Promise<void> {
        const scrollListButtonSelector = `${this.TOAST_CARD_SELECTOR} .position-select`;
        const scrollListItemsSelector = `nb-option-list nb-option:has-text("${position}")`;
        const styleExpectedValue = `justify-content: flex-${horizontalLocation}; align-items: flex-${verticalLocation};`

        await this.click(scrollListButtonSelector);
        await this.click(scrollListItemsSelector);
        await this.click(this.SHOW_TOAST_BUTTON_SELECTOR);
        const positionAttribute = await this.attributes.getAttribute(`${this.TOASTR_SELECTOR} .toastr-overlay-container`, 'style');
        expect(positionAttribute).toBe(styleExpectedValue);
    };
    
    async toastrTabContentValidation(cardHedline: string, cardDescription: string): Promise<void> {
        const headerInputSelector = `${this.TOAST_CARD_SELECTOR} [name="title"]`;
        const bodyInputSelector = `${this.TOAST_CARD_SELECTOR} [name="content"]`;
        await this.fillInput(headerInputSelector, cardHedline);
        await this.fillInput(bodyInputSelector, cardDescription);
        await this.click(this.SHOW_TOAST_BUTTON_SELECTOR);
        const toastHeaderText = await this.getText(`${this.TOASTR_SELECTOR} .content-container .title`);
        const toastBodyText = await this.getText(`${this.TOASTR_SELECTOR} .content-container .message`);
        expect(toastHeaderText).toBe(`Toast 2. ${cardHedline}`);
        expect(toastBodyText).toBe(cardDescription);
    };
    
    async toastrDurationValidation(cardTimeout: number): Promise<void> {
        const timeoutInputSelector = `${this.TOAST_CARD_SELECTOR} [name="timeout"]`;
        await this.fillInput(timeoutInputSelector, String(cardTimeout));
        await this.click(this.SHOW_TOAST_BUTTON_SELECTOR);
        const displayDuration = await this.visualTesting.measureElementVisibilityDuration(`${this.TOASTR_SELECTOR} .content-container`);
        expect(Math.abs(displayDuration) - cardTimeout).toBeLessThan(100);
    };

    async toastTypeValidation(toastType: string): Promise<void> {
        const typeListSelector = `${this.TOAST_CARD_SELECTOR} nb-select button:has-text("primary")`;
        const typeListItemSelector = `nb-option-list nb-option:has-text("${toastType}")`;

        await this.click(typeListSelector);
        await this.click(typeListItemSelector);
        await this.click(this.SHOW_TOAST_BUTTON_SELECTOR);
        const actualToastType = await this.attributes.getAttribute(`${this.TOASTR_SELECTOR} nb-toast`, 'class');
        expect(actualToastType).toContain(`status-${toastType}`);
    };
};
