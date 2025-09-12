import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class PopoverPage extends BasePage{

    //private POPOVER_BODY_LOCATOR: string;

    constructor(page: Page){
        super(page);
        //this.POPOVER_BODY_LOCATOR = `nb-popover nb-card-body`;

    };


    async goToPopoverPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Popover")`, 500);
    };

    private async popoverContentValidation(buttonLocator: string, headlinelocator: string, expectedHeadlinetext: string, bodylocator?: string, 
        expectedBody?: string): Promise<boolean> {
            const actualHeadline = await this.getText(headlinelocator);
            let actualBodyText: string;

            if (bodylocator) {
                actualBodyText = await this.getText(bodylocator);
            }

            return actualHeadline === expectedHeadlinetext && (bodylocator ? actualBodyText === expectedBody : true);
    }


    async popoverPositionValidation(popoverExpectedPosition: string, expectedHeadlinetext: string): Promise<boolean> {
        const buttonLocator = `ngx-popovers button:has-text("${popoverExpectedPosition}")`;
        const popoverLocator = `nb-popover nb-overlay-container`;
        
        await this.moveMouseInBoxedElement(buttonLocator, 0, 0);
        const isContentCorrect = await this.popoverContentValidation(buttonLocator, popoverLocator, expectedHeadlinetext);
        const actualPopoverPosition = await this.getAttribute(buttonLocator ,'nbpopoverplacement');

        return isContentCorrect && actualPopoverPosition === popoverExpectedPosition.toLocaleLowerCase();
    }

    

}