import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class PopoverPage extends BasePage{
    constructor(page: Page){
        super(page);
    };

    async goToPopoverPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Popover")`, this.HALF_SEC);
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
        const headlineSelector = `ngx-popovers nb-card-header:has-text("${tabHeadline}")`;
        const descriptionSelector = `ngx-popovers nb-card:has-text("${tabHeadline}") nb-card-body p`;
        const isHeadlineVisible = await this.isVisible(headlineSelector);
        expect(isHeadlineVisible).toBe(true);
        const actualDescription = await this.getText(descriptionSelector);
        expect(actualDescription).toBe(tabDescription);
    };

    async popoverPositionValidation(popoverExpectedPosition: string, expectedcontent: string): Promise<void> {
        const popoverButtonSelector = `ngx-popovers nb-card:has-text("Popover Position") button:has-text("${popoverExpectedPosition}")`;
        const popoverSelector = `nb-popover nb-overlay-container`;
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(popoverButtonSelector);
        await this.popoverContentValidation(popoverSelector, expectedcontent);
        const actualPopoverPosition = await this.attributes.getAttribute(popoverButtonSelector ,'nbpopoverplacement');
        expect(actualPopoverPosition).toBe(popoverExpectedPosition.toLocaleLowerCase());
    };

    async simplePopoverValidation(popoverName: string, expectedcontent: string, isClickNeeded: boolean): Promise<void> {
        const popoverButtonSelector = `ngx-popovers nb-card:has-text("Simple Popovers") button:has-text("${popoverName}")`;
        const popoverSelector = `nb-popover nb-overlay-container`;
        if (isClickNeeded) {
            const pixelsToMoveX = 0;
            const pixelsToMoveY = 0;
            await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(popoverButtonSelector, pixelsToMoveX, pixelsToMoveY, true);
        } 
        else {
            await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(popoverButtonSelector);
        };
        await this.popoverContentValidation(popoverSelector, expectedcontent);
    };

    async popoverWithTabsValidation(cardName: string, buttonName: string, tab1Headline: string, tab1Content: string, tab2Headline: string, tab2Content: string): Promise<void> {
        const popoverButtonSelector = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
        const tabSelector = `nb-popover nb-overlay-container nb-tabset`;
        const tabcontentSelector = `nb-popover nb-overlay-container nb-tabset`;
        await this.click(popoverButtonSelector);
        await this.click(`${tabSelector} a:has-text("${tab2Headline}")`);
        const actualTab2Content = await this.getText(`${tabcontentSelector} nb-tab[tabtitle="${tab2Headline}"]`);
        expect(actualTab2Content).toBe(tab2Content);
        await this.click(`${tabSelector} a:has-text("${tab1Headline}")`);
        const actualTab1Content = await this.getText(`${tabcontentSelector} nb-tab[tabtitle="${tab1Headline}"]`);
        expect(actualTab1Content).toBe(tab1Content);
    };

    async popoverWithFormValidation(cardName: string, buttonName: string, textBox1placeholder: string, textBox1input: string, textBox2placeholder: string, textBox2input: string, textBox3placeholder: string, textBox3input: string, formButton: string): Promise<void> {
        const popoverButtonSelector = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
        const textBoxSelector = `nb-popover nb-overlay-container form`;
        const formButtonSelector = `nb-popover nb-overlay-container form button:has-text("${formButton}")`;
        await this.click(popoverButtonSelector);
        await this.fillInput(`${textBoxSelector} input[placeholder="${textBox1placeholder}"]`, textBox1input);
        await this.fillInput(`${textBoxSelector} input[placeholder="${textBox2placeholder}"]`, textBox2input);
        await this.fillInput(`${textBoxSelector} textarea[placeholder="${textBox3placeholder}"]`, textBox3input);
        await this.click(formButtonSelector);
    };

    async popoverWithCardValidation(cardName: string,  buttonName: string, cardTitle: string, cardContent: string): Promise<void> {
        const popoverButtonSelector = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
        const cardTitleSelector = `nb-popover nb-overlay-container nb-card-header`;
        const cardContentSelector = `nb-popover nb-overlay-container nb-card-body`;
        await this.click(popoverButtonSelector);
        await this.popoverContentValidation(cardTitleSelector, cardTitle, cardContentSelector, cardContent);
    };

    async eventDebouncingValidation(): Promise<void> {
        const eventDebouncingButtonsSelector = `ngx-popovers nb-card:has-text("Event Debouncing") button`;
        const popoverSelector = `nb-popover nb-overlay-container`;
        await this.mouseAndKeyboardInteraction.fastSweepHover(eventDebouncingButtonsSelector);
        await this.mouseAndKeyboardInteraction.hover(`${eventDebouncingButtonsSelector} >> nth=9`, this.HALF_SEC);
        const isPopoverVisible = await this.isVisible(popoverSelector);
        expect(isPopoverVisible).toBe(true);
    };
};
