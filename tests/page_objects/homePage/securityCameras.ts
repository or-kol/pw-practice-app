import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class SecurityCameras extends BasePage{
    constructor(page: Page){
        super(page);
    }

    async layoutViewButton(desiredButtonStatus: string) {
        const LayoutButtonLocator = `ngx-security-cameras .${desiredButtonStatus}-view-button`
        await this.click(LayoutButtonLocator);

        const buttonStatus = await this.getAttribute(LayoutButtonLocator, `ng-reflect-appearance`);
        return buttonStatus === `filled`;
    }


    async chooseCameraFromGrid(cameraName: string) {
        const gridViewLocator = `ngx-security-cameras .grid-view-button`;
        const cameraLocator = `ngx-security-cameras .grid-container .grid-view .camera:has-text("${cameraName}")`;
        const cameraSelectionValidation = `ngx-security-cameras .grid-container .single-view .camera:has-text("${cameraName}")`;

        await this.click(gridViewLocator);
        await this.click(cameraLocator);

        const cameraSelected = await this.getText(cameraSelectionValidation);
        return cameraSelected === cameraName;
    }

    async controlPanelButonVisibility(buttonName: string) {
        const buttonLocator = `ngx-security-cameras nb-card-footer nb-action:has-text("${buttonName}")`;
        const buttonVisibility = await this.isVisible(buttonLocator);
        return buttonVisibility;
    }
}