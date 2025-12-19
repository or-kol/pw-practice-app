import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class PopoverPage extends BasePage{
    
    private readonly POPOVERS_GENERAL_CARD_SELECTOR = `ngx-popovers nb-card`;
    private readonly POPOVERS_SPECIFIC_CARD_SELECTOR = (cardName: string, label: string) => 
        `${this.POPOVERS_GENERAL_CARD_SELECTOR}:has-text("${cardName}") button:has-text("${label}")`;

    constructor(page: Page){
        super(page);
    };

    async goToPopoverPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Popover")`, this.HALF_SEC);
    };

    
    async popoverTabContentValidation(tabHeadline: string, tabDescription: string): Promise<void> {
        const headlineSelector = `${this.POPOVERS_GENERAL_CARD_SELECTOR}-header:has-text("${tabHeadline}")`;
        const descriptionSelector = `${this.POPOVERS_GENERAL_CARD_SELECTOR}:has-text("${tabHeadline}") nb-card-body p`;
        const isHeadlineVisible = await this.isVisible(headlineSelector);
        expect(isHeadlineVisible).toBe(true);
        const actualDescription = await this.getText(descriptionSelector);
        expect(actualDescription).toBe(tabDescription);
    };

    async popoverPositionValidation(cardName: string, popoverExpectedPosition: string, expectedcontent: string): Promise<void> {
        const popoverButtonSelector = this.POPOVERS_SPECIFIC_CARD_SELECTOR(cardName, popoverExpectedPosition);
        const popoverSelector = `nb-popover nb-overlay-container`;
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(popoverButtonSelector);
        await this.popoverContentValidation(popoverSelector, expectedcontent);
        const actualPopoverPosition = await this.attributes.getAttribute(popoverButtonSelector ,'nbpopoverplacement');
        expect(actualPopoverPosition).toBe(popoverExpectedPosition.toLocaleLowerCase());
    };

    async simplePopoverValidation(cardName: string, popoverName: string, expectedcontent: string, isClickNeeded: boolean): Promise<void> {
        const popoverButtonSelector = this.POPOVERS_SPECIFIC_CARD_SELECTOR(cardName, popoverName);
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

    async popoverWithTabsValidation(
        cardName: string, buttonName: string, tab1Headline: string, tab1Content: string, tab2Headline: string, tab2Content: string): Promise<void> {
            const tabSelector = `nb-popover nb-overlay-container nb-tabset`;
            const tabHeadlineSelector = (tabTitle: string) => `${tabSelector} a:has-text("${tabTitle}")`;
            const tabContentSelector = (tabContent: string) => `${tabSelector} nb-tab[tabtitle="${tabContent}"]`;
            await this.click(this.POPOVERS_SPECIFIC_CARD_SELECTOR(cardName, buttonName));
            await this.click(tabHeadlineSelector(tab2Headline));
            const actualTab2Content = await this.getText(tabContentSelector(tab2Headline));
            expect(actualTab2Content).toBe(tab2Content);
            await this.click(tabHeadlineSelector(tab1Headline));
            const actualTab1Content = await this.getText(tabContentSelector(tab1Headline));
            expect(actualTab1Content).toBe(tab1Content);
    };

    async popoverWithFormValidation(
        cardName: string, buttonName: string, textBox1placeholder: string, textBox1input: string, textBox2placeholder: string, 
        textBox2input: string, textBox3placeholder: string, textBox3input: string, formButton: string): Promise<void> {
            const textBoxSelector = `nb-popover nb-overlay-container form`;
            const formButtonSelector = `${textBoxSelector} button:has-text("${formButton}")`;
            await this.click(this.POPOVERS_SPECIFIC_CARD_SELECTOR(cardName, buttonName));
            await this.fillInput(`${textBoxSelector} input[placeholder="${textBox1placeholder}"]`, textBox1input);
            await this.fillInput(`${textBoxSelector} input[placeholder="${textBox2placeholder}"]`, textBox2input);
            await this.fillInput(`${textBoxSelector} textarea[placeholder="${textBox3placeholder}"]`, textBox3input);
            await this.click(formButtonSelector);
    };

    async popoverWithCardValidation(cardName: string,  buttonName: string, cardTitle: string, cardContent: string): Promise<void> {
        const cardVariantSelector = (tag: string) => `nb-popover nb-overlay-container nb-card-${tag}`;
        await this.click(this.POPOVERS_SPECIFIC_CARD_SELECTOR(cardName, buttonName));
        await this.popoverContentValidation(cardVariantSelector("header"), cardTitle, cardVariantSelector("body"), cardContent);
    };

    async eventDebouncingValidation(): Promise<void> {
        const eventDebouncingButtonsSelector = `${this.POPOVERS_GENERAL_CARD_SELECTOR}:has-text("Event Debouncing") button`;
        const popoverSelector = `nb-popover nb-overlay-container`;
        await this.mouseAndKeyboardInteraction.fastSweepHover(eventDebouncingButtonsSelector);
        await this.mouseAndKeyboardInteraction.hover(`${eventDebouncingButtonsSelector} >> nth=9`, this.HALF_SEC);
        const isPopoverVisible = await this.isVisible(popoverSelector);
        expect(isPopoverVisible).toBe(true);
    };


    private async popoverContentValidation(headlinelocator: string, expectedHeadlinetext: string, bodylocator?: string, expectedBody?: string): Promise<void> {
        const actualHeadline = await this.getText(headlinelocator);
        expect(actualHeadline).toBe(expectedHeadlinetext);

        if (bodylocator && expectedBody !== undefined) {
            const actualBodyText = await this.getText(bodylocator);
            expect(actualBodyText).toBe(expectedBody);
        };
    };
};
