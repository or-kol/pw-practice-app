import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class SecurityCameras extends BasePage{
    
    constructor(page: Page){
        super(page);
    };


    async layoutViewButton(desiredButtonStatus: string): Promise<void>{
        const LayoutButtonSelector = `ngx-security-cameras .${desiredButtonStatus}-view-button`
        
        await this.click(LayoutButtonSelector);
        const buttonStatus = await this.attributes.getAttribute(LayoutButtonSelector, `ng-reflect-appearance`);
        expect(buttonStatus).toBe(`filled`);
    };

    async chooseCameraFromGrid(cameraName: string): Promise<void> {
        const gridViewSelector = `ngx-security-cameras .grid-view-button`;
        const cameraSelector = `ngx-security-cameras .grid-container .grid-view .camera:has-text("${cameraName}")`;
        const cameraSelectionValidation = `ngx-security-cameras .grid-container .single-view .camera:has-text("${cameraName}")`;

        await this.click(gridViewSelector);
        await this.click(cameraSelector);
        const cameraSelected = await this.getText(cameraSelectionValidation);
        expect(cameraSelected).toBe(cameraName);
    };

    async controlPanelButonVisibility(buttonName: string): Promise<void> {
        const buttonSelector = `ngx-security-cameras nb-card-footer nb-action:has-text("${buttonName}")`;

        const buttonVisibility = await this.isVisible(buttonSelector);
        expect(buttonVisibility).toBe(true);
    };
};