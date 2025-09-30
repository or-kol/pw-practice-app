import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class TooltipPage extends BasePage{

    private readonly TOOLTIP_LOCATOR = `nb-tooltip`;
    private readonly TOOLTIP_BUTTON_LOCATOR = `ngx-tooltip nb-card nb-card-body`;

    constructor(page: Page){
        super(page);
    };


    async goToTooltipPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("tooltip")`, 500);
    };


    async tooltipTabContentValidation(tooltipExpectedContent: string, buttonName: string): Promise<boolean> {
        
        const tooltipButtonLocator = `${this.TOOLTIP_BUTTON_LOCATOR} button:has-text("${buttonName}") >> nth=0`;

        await this.mouseInteraction.hover(tooltipButtonLocator);

        const tooltipActualContent = await this.getText(this.TOOLTIP_LOCATOR);
        return tooltipActualContent === tooltipExpectedContent;
    };


    async tooltipIconValidation(icon: string): Promise<boolean> {
        const iconLocator = `${this.TOOLTIP_LOCATOR} nb-icon`;

        await this.mouseInteraction.hover(`${this.TOOLTIP_BUTTON_LOCATOR} [nbtooltipicon="${icon}"]`);
        const actualIcon = await this.attributes.getAttribute(iconLocator, `ng-reflect-config`);

        return actualIcon === icon;
    };


    async tooltipPositionValidation(position: string, classValidation: string): Promise<boolean> {
        const tooltipButtonLocator = `${this.TOOLTIP_BUTTON_LOCATOR} button:has-text("${position}")`;

        await this.mouseInteraction.hover(tooltipButtonLocator);
        const tooltipClass = await this.attributes.getAttribute(this.TOOLTIP_LOCATOR, 'class');

        return tooltipClass.includes(classValidation);
    };


    async tooltipColorValidation(type: string, backgroundColor: string): Promise<boolean> {
        const tooltipButtonLocator = `${this.TOOLTIP_BUTTON_LOCATOR} button:has-text("${type}")`;
        await this.mouseInteraction.hover(tooltipButtonLocator);
        const actualTooltipColor = await this.attributes.getElementCssProperty(this.TOOLTIP_LOCATOR, "background-color");
        console.log(actualTooltipColor);
        console.log(backgroundColor);
        return actualTooltipColor === backgroundColor;
    };
};
