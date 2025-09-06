import { Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class DialogPage extends BasePage{
    
    private DIALOG_HEADER_LOCATOR: string;
    private DIALOG_FOOTER_LOCATOR: string;

    constructor(page: Page){
        super(page);
        this.DIALOG_HEADER_LOCATOR = `nb-dialog-container nb-card-header`; 
        this.DIALOG_FOOTER_LOCATOR = `nb-dialog-container nb-card-footer`;
    }


    async goToDialogPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Dialog")`, 500);
    }

    private async openDialogbox(dialogNum: number, dialogName: string): Promise<void> {
        const dialogButtonLocator = `ngx-dialog div:nth-child(${dialogNum}) nb-card-body button:has-text("${dialogName}")`;
        await this.click(dialogButtonLocator);
    }


    private async handleBackdrop(dialogButtonLocator:string): Promise<void> {
        await this.moveMouseInBoxedElement(dialogButtonLocator, -500, 0);
        await this.page.mouse.down();
        await this.page.mouse.up();
    };



    async dialogContentValidation(dialogNum: number, dialogName: string, header: string, body:string): Promise<boolean> {
        const dialogBodyLocator = `nb-dialog-container nb-card-body`;
        
        await this.openDialogbox(dialogNum, dialogName);

        const actualHeader = await this.getText(this.DIALOG_HEADER_LOCATOR);
        const actualBody = await this.getText(dialogBodyLocator);
        
        return actualHeader === header && actualBody === body;
    }


    async dialogComponentOrTemplate(
            dialogNum: number, dialogName: string, header: string, body:string, buttonText: string): Promise<boolean> {
        
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${buttonText}")`;
        
        await this.click(dialogButtonLocator);
        const isdialogVisible = await this.isVisible(dialogButtonLocator);
        
        return (!isdialogVisible);
    }


    async dialogBackdrop(
            dialogNum: number, dialogName: string, header: string, body:string, buttonText: string, backdrop: boolean): Promise<boolean> {

        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${buttonText}")`;

        await this.handleBackdrop(dialogButtonLocator);

        const isdialogVisible = await this.isVisible(dialogButtonLocator);
        return (!isdialogVisible) === backdrop;
    }


    async dialogEscClose(
            dialogNum: number, dialogName: string, header: string, body:string, buttonText: string, esc: boolean): Promise<boolean> {
                
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${buttonText}")`;

        await this.pressKeyboardKey("Escape");
        
        const isdialogVisible = await this.isVisible(dialogButtonLocator);
        return (!isdialogVisible) === esc;
    }


    async dialogResultReturn(
            dialogNum: number, dialogName: string, header: string, button: string, input: string): Promise<boolean> {
                
        await this.openDialogbox(dialogNum, dialogName);
        const dialogButtonLocator = `${this.DIALOG_FOOTER_LOCATOR} button:has-text("${button}")`;
        const inputFieldLocator = `ngx-dialog-name-prompt input`;
        const returnedValueLocator = `ngx-dialog div nb-card-body ul`;

        const actualHeader = await this.getText(this.DIALOG_HEADER_LOCATOR);
        const actualPlaceholder = await this.getAttribute(inputFieldLocator, "placeholder");
        
        await this.fill(inputFieldLocator, input);
        await this.click(dialogButtonLocator);

        const returnedValue = await this.getText(returnedValueLocator) || "";

        return header === actualHeader && actualPlaceholder === "Name" && returnedValue === input;
    }

}