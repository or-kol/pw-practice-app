import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class PopoverPage extends BasePage{
    constructor(page: Page){
        super(page);
    };

    async goToPopoverPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Popover")`, 500);
    };

    private async popoverContentValidation(headlinelocator: string, expectedHeadlinetext: string, bodylocator?: string, expectedBody?: string): Promise<void> {
        const actualHeadline = await this.getText(headlinelocator);
        expect(actualHeadline).toBe(expectedHeadlinetext);

        if (bodylocator && expectedBody !== undefined) {
            const actualBodyText = await this.getText(bodylocator);
            expect(actualBodyText).toBe(expectedBody);
        };
    };

    async popoverTabContentValidation(tabHeadline: string, tabDescription: string): Promise<void> {
        const headlineLocator = `ngx-popovers nb-card-header:has-text("${tabHeadline}")`;
        const descriptionLocator = `ngx-popovers nb-card:has-text("${tabHeadline}") nb-card-body p`;
        const isHeadlineVisible = await this.isVisible(headlineLocator);
        expect(isHeadlineVisible).toBe(true);
        const actualDescription = await this.getText(descriptionLocator);
        expect(actualDescription).toBe(tabDescription);
    };

    async popoverPositionValidation(popoverExpectedPosition: string, expectedcontent: string): Promise<void> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("Popover Position") button:has-text("${popoverExpectedPosition}")`;
        const popoverLocator = `nb-popover nb-overlay-container`;
        await this.mouseInteraction.moveMouseInBoxedElement(popoverButtonLocator);
        await this.popoverContentValidation(popoverLocator, expectedcontent);
        const actualPopoverPosition = await this.attributes.getAttribute(popoverButtonLocator ,'nbpopoverplacement');
        expect(actualPopoverPosition).toBe(popoverExpectedPosition.toLocaleLowerCase());
    };

    async simplePopoverValidation(popoverName: string, expectedcontent: string, isClickNeeded: boolean): Promise<void> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("Simple Popovers") button:has-text("${popoverName}")`;
        const popoverLocator = `nb-popover nb-overlay-container`;
        if (isClickNeeded) {
            await this.mouseInteraction.moveMouseInBoxedElement(popoverButtonLocator, 0, 0, true);
        } 
        else {
            await this.mouseInteraction.moveMouseInBoxedElement(popoverButtonLocator);
        };
        await this.popoverContentValidation(popoverLocator, expectedcontent);
    };

    async popoverWithTabsValidation(cardName: string, buttonName: string, tab1Headline: string, tab1Content: string, tab2Headline: string, tab2Content: string): Promise<void> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
        const tabLocator = `nb-popover nb-overlay-container nb-tabset`;
        const tabcontentLocator = `nb-popover nb-overlay-container nb-tabset`;
        await this.click(popoverButtonLocator);
        await this.click(`${tabLocator} a:has-text("${tab2Headline}")`);
        const actualTab2Content = await this.getText(`${tabcontentLocator} nb-tab[tabtitle="${tab2Headline}"]`);
        expect(actualTab2Content).toBe(tab2Content);
        await this.click(`${tabLocator} a:has-text("${tab1Headline}")`);
        const actualTab1Content = await this.getText(`${tabcontentLocator} nb-tab[tabtitle="${tab1Headline}"]`);
        expect(actualTab1Content).toBe(tab1Content);
    };

    async popoverWithFormValidation(cardName: string, buttonName: string, textBox1placeholder: string, textBox1input: string, textBox2placeholder: string, textBox2input: string, textBox3placeholder: string, textBox3input: string, formButton: string): Promise<void> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
        const textBoxLocator = `nb-popover nb-overlay-container form`;
        const formButtonLocator = `nb-popover nb-overlay-container form button:has-text("${formButton}")`;
        await this.click(popoverButtonLocator);
        await this.fillInput({ selector: `${textBoxLocator} input[placeholder="${textBox1placeholder}"]`, value: textBox1input });
        await this.fillInput({ selector: `${textBoxLocator} input[placeholder="${textBox2placeholder}"]`, value: textBox2input });
        await this.fillInput({ selector: `${textBoxLocator} textarea[placeholder="${textBox3placeholder}"]`, value: textBox3input });
        await this.click(formButtonLocator);
    };

    async popoverWithCardValidation(cardName: string,  buttonName: string, cardTitle: string, cardContent: string): Promise<void> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
        const cardTitleLocator = `nb-popover nb-overlay-container nb-card-header`;
        const cardContentLocator = `nb-popover nb-overlay-container nb-card-body`;
        await this.click(popoverButtonLocator);
        await this.popoverContentValidation(cardTitleLocator, cardTitle, cardContentLocator, cardContent);
    };

    async eventDebouncingValidation(): Promise<void> {
        const eventDebouncingButtonsLocator = `ngx-popovers nb-card:has-text("Event Debouncing") button`;
        const popoverLocator = `nb-popover nb-overlay-container`;
        await this.mouseInteraction.fastSweepHover(eventDebouncingButtonsLocator);
        await this.mouseInteraction.hover(`${eventDebouncingButtonsLocator} >> nth=9`, 500);
        const isPopoverVisible = await this.isVisible(popoverLocator);
        expect(isPopoverVisible).toBe(true);
    };
};
