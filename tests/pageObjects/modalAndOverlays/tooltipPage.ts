import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class TooltipPage extends BasePage{

    private readonly TOOLTIP_SELECTOR = `nb-tooltip`;
    private readonly TOOLTIP_BUTTON_SELECTOR = (label: string) => `ngx-tooltip nb-card nb-card-body button:has-text("${label}")`;

    constructor(page: Page){
        super(page);
    };


    async goToTooltipPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("tooltip")`, this.HALF_SEC);
    };

    async tooltipTabContentValidation(tooltipExpectedContent: string, buttonName: string): Promise<void> {
        const tooltipButtonSelector = `${this.TOOLTIP_BUTTON_SELECTOR(buttonName)} >> nth=0`;
        await this.mouseAndKeyboardInteraction.hover(tooltipButtonSelector);
        const tooltipActualContent = await this.getText(this.TOOLTIP_SELECTOR);
        expect(tooltipActualContent).toBe(tooltipExpectedContent);
    };

    async tooltipIconValidation(icon: string): Promise<void> {
        const iconSelector = `${this.TOOLTIP_SELECTOR} nb-icon`;
        await this.mouseAndKeyboardInteraction.hover(`ngx-tooltip nb-card nb-card-body [nbtooltipicon="${icon}"]`);
        const actualIcon = await this.attributes.getAttribute(iconSelector, `ng-reflect-config`);
        expect(actualIcon).toBe(icon);
    };

    async tooltipPositionValidation(position: string, classValidation: string): Promise<void> {
        await this.mouseAndKeyboardInteraction.hover(this.TOOLTIP_BUTTON_SELECTOR(position));
        const tooltipClass = await this.attributes.getAttribute(this.TOOLTIP_SELECTOR, 'class');
        expect(tooltipClass).toContain(classValidation);
    };

    async tooltipColorValidation(type: string, backgroundColor: string): Promise<void> {
        await this.mouseAndKeyboardInteraction.hover(this.TOOLTIP_BUTTON_SELECTOR(type));
        const actualTooltipColor = await this.attributes.getElementCssProperty(this.TOOLTIP_SELECTOR, "background-color");
        expect(actualTooltipColor).toBe(backgroundColor);
    };
};
