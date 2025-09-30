import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class ToastrPage extends BasePage{

    private readonly TOASTR_LOCATOR = `nb-layout .cdk-overlay-container`;
    private readonly SHOW_TOAST_BUTTON_LOCATOR = `ngx-toastr nb-card-footer button:has-text("Show Toast")`;

    constructor(page: Page){
        super(page);
    };


    async goToToastrPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("toastr")`, 500);
    };



    async toastPositionValidation(position: string, verticalLocation: string, horizontalLocation: string): Promise<boolean> {
        const scrollListButtonLocator = `ngx-toastr nb-card-body .position-select`;
        const scrollListItemsLocator = `nb-option-list nb-option:has-text("${position}")`;
        const styleExpectedValue = `justify-content: flex-${horizontalLocation}; align-items: flex-${verticalLocation};`

        await this.click(scrollListButtonLocator);
        await this.click(scrollListItemsLocator);
        await this.click(this.SHOW_TOAST_BUTTON_LOCATOR);
        const positionAttribute = await this.attributes.getAttribute(`${this.TOASTR_LOCATOR} .toastr-overlay-container`, 'style');

        return positionAttribute === styleExpectedValue;
    };
    

    async toastrTabContentValidation(cardHedline: string, cardDescription: string): Promise<boolean> {
        const headerInputLocator = `ngx-toastr nb-card-body [name="title"]`;
        const bodyInputLocator = `ngx-toastr nb-card-body [name="content"]`;

        await this.fillInput({ selector: headerInputLocator, value: cardHedline });
        await this.fillInput({ selector: bodyInputLocator, value: cardDescription });
        await this.click(this.SHOW_TOAST_BUTTON_LOCATOR);
        const toastHeaderText = await this.getText(`${this.TOASTR_LOCATOR} .content-container .title`);
        const toastBodyText = await this.getText(`${this.TOASTR_LOCATOR} .content-container .message`);

        return toastHeaderText === `Toast 2. ${cardHedline}` && toastBodyText === cardDescription;
    };
    

    async toastrDurationValidation(cardTimeout: number): Promise<boolean> {
        const timeoutInputLocator = `ngx-toastr nb-card-body [name="timeout"]`;
        
        await this.fillInput({ selector: timeoutInputLocator, value: String(cardTimeout) });
        await this.click(this.SHOW_TOAST_BUTTON_LOCATOR);
        const displayDuration = await this.visualTesting.measureElementVisibilityDuration(`${this.TOASTR_LOCATOR} .content-container`);

        return (Math.abs(displayDuration) - cardTimeout) < 100;
    };


    async toastTypeValidation(toastType: string): Promise<boolean> {
        const typeListLocator = `ngx-toastr nb-card-body nb-select button:has-text("primary")`;
        const typeListItemLocator = `nb-option-list nb-option:has-text("${toastType}")`;

        await this.click(typeListLocator);
        await this.click(typeListItemLocator);
        await this.click(this.SHOW_TOAST_BUTTON_LOCATOR);
        const actualToastType = await this.attributes.getAttribute(`${this.TOASTR_LOCATOR} nb-toast`, 'class');

        return actualToastType.includes(`status-${toastType}`);
    };
};
