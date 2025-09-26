import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class PopoverPage extends BasePage{

    constructor(page: Page){
        super(page);
    };


    async goToPopoverPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Popover")`, 500);
    };

    private async popoverContentValidation(headlinelocator: string, expectedHeadlinetext: string, bodylocator?: string, 
        expectedBody?: string): Promise<boolean> {
            const actualHeadline = await this.getText(headlinelocator);
            let actualBodyText: string;

            if (bodylocator) {
                actualBodyText = await this.getText(bodylocator);
            };

            return actualHeadline === expectedHeadlinetext && (bodylocator ? actualBodyText === expectedBody : true);
    };

    
    async popoverTabContentValidation(tabHeadline: string, tabDescription: string): Promise<boolean> {
        const headlineLocator = `ngx-popovers nb-card-header:has-text("${tabHeadline}")`;
        const descriptionLocator = `ngx-popovers nb-card:has-text("${tabHeadline}") nb-card-body p`;

        const isHeadlineVisible = await this.isVisible(headlineLocator);
        const isDescriptionCorrect = await this.getText(descriptionLocator) === tabDescription;

        return isHeadlineVisible && isDescriptionCorrect;
    };
    

    async popoverPositionValidation(popoverExpectedPosition: string, expectedcontent: string): Promise<boolean> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("Popover Position") button:has-text("${popoverExpectedPosition}")`;
        const popoverLocator = `nb-popover nb-overlay-container`;
        
        await this.moveMouseInBoxedElement(popoverButtonLocator);
        const isContentCorrect = await this.popoverContentValidation(popoverLocator, expectedcontent);
        const actualPopoverPosition = await this.getAttribute(popoverButtonLocator ,'nbpopoverplacement');

        return isContentCorrect && actualPopoverPosition === popoverExpectedPosition.toLocaleLowerCase();
    };


    async simplePopoverValidation(popoverName: string, expectedcontent: string, isClickNeeded: boolean): Promise<boolean> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("Simple Popovers") button:has-text("${popoverName}")`;
        const popoverLocator = `nb-popover nb-overlay-container`;
        
        isClickNeeded ? await this.moveMouseInBoxedElement(popoverButtonLocator, 0, 0, true): await this.moveMouseInBoxedElement(popoverButtonLocator);
        const isContentCorrect = await this.popoverContentValidation(popoverLocator, expectedcontent);
        
        return isContentCorrect;
    };


    async popoverWithTabsValidation(cardName: string, buttonName: string, tab1Headline: string, tab1Content: string, 
        tab2Headline: string, tab2Content: string): Promise<boolean> {
            const popoverButtonLocator = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
            const tabLocator = `nb-popover nb-overlay-container nb-tabset`;
            const tabcontentLocator = `nb-popover nb-overlay-container nb-tabset`;

            await this.click(popoverButtonLocator);
            await this.click(`${tabLocator} a:has-text("${tab2Headline}")`);
            const isTab2ContentCorrect = await this.getText(`${tabcontentLocator} nb-tab[tabtitle="${tab2Headline}"]`) === tab2Content;
            await this.click(`${tabLocator} a:has-text("${tab1Headline}")`);
            const isTab1ContentCorrect = await this.getText(`${tabcontentLocator} nb-tab[tabtitle="${tab1Headline}"]`) === tab1Content;
            
            return isTab1ContentCorrect && isTab2ContentCorrect;
    };


    async popoverWithFormValidation(cardName: string, buttonName: string, textBox1placeholder: string, textBox1input: string,
        textBox2placeholder: string, textBox2input: string, textBox3placeholder: string, textBox3input: string, formButton: string): Promise<boolean> {
            const popoverButtonLocator = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
            const textBoxLocator = `nb-popover nb-overlay-container form`;
            const formButtonLocator = `nb-popover nb-overlay-container form button:has-text("${formButton}")`;
            
            await this.click(popoverButtonLocator);
            const isTextbox1Fill = await this.fillInput({ selector: `${textBoxLocator} input[placeholder="${textBox1placeholder}"]`, value: textBox1input });
            const isTextbox2Fill = await this.fillInput({ selector: `${textBoxLocator} input[placeholder="${textBox2placeholder}"]`, value: textBox2input });
            const isTextbox3Fill = await this.fillInput({ selector: `${textBoxLocator} textarea[placeholder="${textBox3placeholder}"]`, value: textBox3input });
            const isButtonClicked = await this.click(formButtonLocator);

            return isTextbox1Fill && isTextbox2Fill && isTextbox3Fill && isButtonClicked;
    };


    async popoverWithCardValidation(cardName: string,  buttonName: string, cardTitle: string, cardContent: string): Promise<boolean> {
        const popoverButtonLocator = `ngx-popovers nb-card:has-text("${cardName}") button:has-text("${buttonName}")`;
        const cardTitleLocator = `nb-popover nb-overlay-container nb-card-header`;
        const cardContentLocator = `nb-popover nb-overlay-container nb-card-body`;

        await this.click(popoverButtonLocator);
        const isContentCorrect = await this.popoverContentValidation(cardTitleLocator, cardTitle, cardContentLocator, cardContent);

        return isContentCorrect;
    };


    async eventDebouncingValidation(): Promise<boolean> {
        const eventDebouncingButtonsLocator = `ngx-popovers nb-card:has-text("Event Debouncing") button`;
        const popoverLocator = `nb-popover nb-overlay-container`;
        
        await this.fastSweepHover(eventDebouncingButtonsLocator);
        await this.hover(`${eventDebouncingButtonsLocator} >> nth=9`, 500);
        const isPopoverVisible = await this.isVisible(popoverLocator);
        
        console.log(isPopoverVisible);
        return isPopoverVisible;
    };

};
