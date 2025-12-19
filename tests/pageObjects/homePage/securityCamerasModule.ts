import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class SecurityCameras extends BasePage{
    
    private readonly SECURITY_CAMERAS_SELECTOR = `ngx-security-cameras`;
    constructor(page: Page){
        super(page);
    };


    async layoutViewButton(desiredButtonStatus: string): Promise<void>{
        const LayoutButtonSelector = `${this.SECURITY_CAMERAS_SELECTOR} .${desiredButtonStatus}-view-button`
        await this.click(LayoutButtonSelector);
        const buttonStatus = await this.attributes.getAttribute(LayoutButtonSelector, `ng-reflect-appearance`);
        expect(buttonStatus).toBe(`filled`);
    };

    async chooseCameraFromGrid(cameraName: string): Promise<void> {
        const gridViewSelector = `${this.SECURITY_CAMERAS_SELECTOR} .grid-view-button`;
        const cameraViewSelection = (view: "grid-view" | "single-view") => `${this.SECURITY_CAMERAS_SELECTOR} .grid-container .${view} .camera:has-text("${cameraName}")`;
        await this.click(gridViewSelector);
        await this.click(cameraViewSelection("grid-view"));
        const cameraSelected = await this.getText(cameraViewSelection("single-view"));
        expect(cameraSelected).toBe(cameraName);
    };

    async controlPanelButonVisibility(buttonName: string): Promise<void> {
        const buttonSelector = `${this.SECURITY_CAMERAS_SELECTOR} nb-card-footer nb-action:has-text("${buttonName}")`;
        const buttonVisibility = await this.isVisible(buttonSelector);
        expect(buttonVisibility).toBe(true);
    };
};