import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class DialogPage extends BasePage{
    private readonly DIALOG_HEADER_SELECTOR = `nb-dialog-container nb-card-header`;
    private readonly DIALOG_FOOTER_SELECTOR = `nb-dialog-container nb-card-footer`;

    constructor(page: Page){
        super(page);
    };

    async goToDialogPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Dialog")`, this.HALF_SEC);
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

    async dialogContentValidation(dialogNum: number, dialogName: string, header: string, body:string): Promise<void> {
        const dialogBodySelector = `nb-dialog-container nb-card-body`;
        await this.openDialogbox(dialogNum, dialogName);
        const actualHeader = await this.getText(this.DIALOG_HEADER_SELECTOR);
        const actualBody = await this.getText(dialogBodySelector);
        expect(actualHeader).toBe(header);
        expect(actualBody).toBe(body);
    };

    async dialogComponentOrTemplate(
        dialogNum: number, dialogName: string, header: string, body:string, buttonText: string): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonSelector = `${this.DIALOG_FOOTER_SELECTOR} button:has-text("${buttonText}")`;
        await this.click(dialogButtonSelector);
        const isdialogVisible = await this.isVisible(dialogButtonSelector);
        expect(isdialogVisible).toBe(false);
    };

    async dialogBackdrop(
        dialogNum: number, dialogName: string, header: string, body:string, buttonText: string, backdrop: boolean): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonSelector = `${this.DIALOG_FOOTER_SELECTOR} button:has-text("${buttonText}")`;
        await this.handleBackdrop(dialogButtonSelector);
        const isdialogVisible = await this.isVisible(dialogButtonSelector);
        expect((!isdialogVisible)).toBe(backdrop);
    };

    async dialogEscClose(
        dialogNum: number, dialogName: string, header: string, body:string, buttonText: string, esc: boolean): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonSelector = `${this.DIALOG_FOOTER_SELECTOR} button:has-text("${buttonText}")`;
        await this.mouseAndKeyboardInteraction.pressKeyboardKey("Escape");
        const isdialogVisible = await this.isVisible(dialogButtonSelector);
        expect((!isdialogVisible)).toBe(esc);
    };

    async dialogResultReturn(
        dialogNum: number, dialogName: string, header: string, button: string, input: string): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonSelector = `${this.DIALOG_FOOTER_SELECTOR} button:has-text("${button}")`;
        const inputFieldSelector = `ngx-dialog-name-prompt input`;
        const returnedValueSelector = `ngx-dialog div nb-card-body ul`;
        
        const actualHeader = await this.getText(this.DIALOG_HEADER_SELECTOR);
        const actualPlaceholder = await this.attributes.getAttribute(inputFieldSelector, "placeholder");
        await this.fillInput(inputFieldSelector, input);
        await this.click(dialogButtonSelector);
        const returnedValue = await this.getText(returnedValueSelector) || "";
        expect(actualHeader).toBe(header);
        expect(actualPlaceholder).toBe("Name");
        expect(returnedValue).toBe(input);
    };
};