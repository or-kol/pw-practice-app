import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class DialogPage extends BasePage{
    private DIALOG_HEADER_LOCATOR: string;
    private DIALOG_FOOTER_LOCATOR: string;

    constructor(page: Page){
        super(page);
        this.DIALOG_HEADER_LOCATOR = `nb-dialog-container nb-card-header`; 
        this.DIALOG_FOOTER_LOCATOR = `nb-dialog-container nb-card-footer`;
    };

    async goToDialogPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Dialog")`, 500);
    };

    private async openDialogbox(dialogNum: number, dialogName: string): Promise<void> {
        const dialogButtonLocator = `ngx-dialog div:nth-child(${dialogNum}) nb-card-body button:has-text("${dialogName}")`;
        await this.click(dialogButtonLocator);
    };

    private async handleBackdrop(dialogButtonLocator:string): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(dialogButtonLocator, -500, 0);
        await this.mouseAndKeyboardInteraction.mouseClick();
    };

    async dialogContentValidation(dialogNum: number, dialogName: string, header: string, body:string): Promise<void> {
        const dialogBodyLocator = `nb-dialog-container nb-card-body`;
        await this.openDialogbox(dialogNum, dialogName);
        const actualHeader = await this.getText(this.DIALOG_HEADER_LOCATOR);
        const actualBody = await this.getText(dialogBodyLocator);
        expect(actualHeader).toBe(header);
        expect(actualBody).toBe(body);
    };

    async dialogComponentOrTemplate(
        dialogNum: number, dialogName: string, header: string, body:string, buttonText: string): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${buttonText}")`;
        await this.click(dialogButtonLocator);
        const isdialogVisible = await this.isVisible(dialogButtonLocator);
        expect(isdialogVisible).toBe(false);
    };

    async dialogBackdrop(
        dialogNum: number, dialogName: string, header: string, body:string, buttonText: string, backdrop: boolean): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${buttonText}")`;
        await this.handleBackdrop(dialogButtonLocator);
        const isdialogVisible = await this.isVisible(dialogButtonLocator);
        expect((!isdialogVisible)).toBe(backdrop);
    };

    async dialogEscClose(
        dialogNum: number, dialogName: string, header: string, body:string, buttonText: string, esc: boolean): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${buttonText}")`;
        await this.mouseAndKeyboardInteraction.pressKeyboardKey("Escape");
        const isdialogVisible = await this.isVisible(dialogButtonLocator);
        expect((!isdialogVisible)).toBe(esc);
    };

    async dialogResultReturn(
        dialogNum: number, dialogName: string, header: string, button: string, input: string): Promise<void> {
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${button}")`;
        const inputFieldLocator = `ngx-dialog-name-prompt input`;
        const returnedValueLocator = `ngx-dialog div nb-card-body ul`;
        
        const actualHeader = await this.getText(this.DIALOG_HEADER_LOCATOR);
        const actualPlaceholder = await this.attributes.getAttribute(inputFieldLocator, "placeholder");
        await this.fillInput({ selector: inputFieldLocator, value: input });
        await this.click(dialogButtonLocator);
        const returnedValue = await this.getText(returnedValueLocator) || "";
        expect(actualHeader).toBe(header);
        expect(actualPlaceholder).toBe("Name");
        expect(returnedValue).toBe(input);
    };
};