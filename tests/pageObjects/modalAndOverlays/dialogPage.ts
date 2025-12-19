import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class DialogPage extends BasePage{

    private readonly DIALOG_HEADER_SELECTOR = `nb-dialog-container nb-card-header`;
    private readonly DIALOG_BODY_SELECTOR = `nb-dialog-container nb-card-body`;
    private readonly DIALOG_BUTTON_SELECTOR = (buttonText: string) => `nb-dialog-container nb-card-footer button:has-text("${buttonText}")`;
    
    constructor(page: Page){
        super(page);
    };

    async goToDialogPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Dialog")`, this.HALF_SEC);
    };


    async dialogContentValidation(dialogNum: number, dialogName: string, header: string, body:string): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const actualHeader = await this.getText(this.DIALOG_HEADER_SELECTOR);
        const actualBody = await this.getText(this.DIALOG_BODY_SELECTOR);
        expect(actualHeader).toBe(header);
        expect(actualBody).toBe(body);
    };

    async dialogComponentOrTemplate(dialogNum: number, dialogName: string, buttonText: string): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        await this.click(this.DIALOG_BUTTON_SELECTOR(buttonText));
        const isdialogVisible = await this.isVisible(this.DIALOG_BUTTON_SELECTOR(buttonText));
        expect(isdialogVisible).toBe(false);
    };

    async dialogBackdrop(
        dialogNum: number, dialogName: string, buttonText: string, backdrop: boolean): Promise<void> {
            await this.openDialogbox(dialogNum, dialogName);
            await this.handleBackdrop(this.DIALOG_BUTTON_SELECTOR(buttonText));
            const isdialogVisible = await this.isVisible(this.DIALOG_BUTTON_SELECTOR(buttonText));
            expect((!isdialogVisible)).toBe(backdrop);
    };

    async dialogEscClose(
        dialogNum: number, dialogName: string, buttonText: string, esc: boolean): Promise<void> {
            await this.openDialogbox(dialogNum, dialogName);
            await this.mouseAndKeyboardInteraction.pressKeyboardKey("Escape");
            const isdialogVisible = await this.isVisible(this.DIALOG_BUTTON_SELECTOR(buttonText));
            expect((!isdialogVisible)).toBe(esc);
    };

    async dialogResultReturn(
        dialogNum: number, dialogName: string, header: string, button: string, input: string): Promise<void> {
            await this.openDialogbox(dialogNum, dialogName);
            
            const inputFieldSelector = `ngx-dialog-name-prompt input`;
            const returnedValueSelector = `ngx-dialog div nb-card-body ul`;
            
            const actualHeader = await this.getText(this.DIALOG_HEADER_SELECTOR);
            const actualPlaceholder = await this.attributes.getAttribute(inputFieldSelector, "placeholder");
            await this.fillInput(inputFieldSelector, input);
            await this.click(this.DIALOG_BUTTON_SELECTOR(button));
            const returnedValue = await this.getText(returnedValueSelector) || "";
            expect(actualHeader).toBe(header);
            expect(actualPlaceholder).toBe("Name");
            expect(returnedValue).toBe(input);
    };

    
    private async openDialogbox(dialogNum: number, dialogName: string): Promise<void> {
        const dialogButtonSelector = `ngx-dialog div:nth-child(${dialogNum}) nb-card-body button:has-text("${dialogName}")`;
        await this.click(dialogButtonSelector);
    };

    private async handleBackdrop(dialogButtonSelector:string): Promise<void> {
        const pixelsToMoveX = -500;
        const pixelsToMoveY = 0;
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(dialogButtonSelector, pixelsToMoveX, pixelsToMoveY);
        await this.mouseAndKeyboardInteraction.mouseClick();
    };
};