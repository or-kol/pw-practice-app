import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class TooltipPage extends BasePage{

    private readonly TOOLTIP_LOCATOR = `nb-tooltip`;
    private readonly TOOLTIP_BUTTON_LOCATOR = `ngx-tooltip nb-card nb-card-body`;

    constructor(page: Page){
        super(page);
    };


    async goToTooltipPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("tooltip")`, this.HALF_SEC);
    };

    async tooltipTabContentValidation(tooltipExpectedContent: string, buttonName: string): Promise<void> {
        const tooltipButtonLocator = `${this.TOOLTIP_BUTTON_LOCATOR} button:has-text("${buttonName}") >> nth=0`;

        await this.mouseAndKeyboardInteraction.hover(tooltipButtonLocator);
        const tooltipActualContent = await this.getText(this.TOOLTIP_LOCATOR);
        expect(tooltipActualContent).toBe(tooltipExpectedContent);
    };

    async tooltipIconValidation(icon: string): Promise<void> {
        const iconLocator = `${this.TOOLTIP_LOCATOR} nb-icon`;

        await this.mouseAndKeyboardInteraction.hover(`${this.TOOLTIP_BUTTON_LOCATOR} [nbtooltipicon="${icon}"]`);
        const actualIcon = await this.attributes.getAttribute(iconLocator, `ng-reflect-config`);
        expect(actualIcon).toBe(icon);
    };

    async tooltipPositionValidation(position: string, classValidation: string): Promise<void> {
        const tooltipButtonLocator = `${this.TOOLTIP_BUTTON_LOCATOR} button:has-text("${position}")`;

        await this.mouseAndKeyboardInteraction.hover(tooltipButtonLocator);
        const tooltipClass = await this.attributes.getAttribute(this.TOOLTIP_LOCATOR, 'class');
        expect(tooltipClass).toContain(classValidation);
    };

    async tooltipColorValidation(type: string, backgroundColor: string): Promise<void> {
        const tooltipButtonLocator = `${this.TOOLTIP_BUTTON_LOCATOR} button:has-text("${type}")`;

        await this.mouseAndKeyboardInteraction.hover(tooltipButtonLocator);
        const actualTooltipColor = await this.attributes.getElementCssProperty(this.TOOLTIP_LOCATOR, "background-color");
        expect(actualTooltipColor).toBe(backgroundColor);
    };
};
