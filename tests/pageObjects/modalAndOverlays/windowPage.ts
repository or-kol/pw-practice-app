import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class WindowPage extends BasePage{

    private WINDOW_BODY_LOCATOR: string;

    constructor(page: Page){
        super(page);
        this.WINDOW_BODY_LOCATOR = `nb-window nb-card-body`;

    };


    async goToWindowPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Window")`, 500);
    };

    private async openWindow(windowName: string): Promise<void> {
        const windowLocator = `nb-card button:has-text("${windowName}")`;
        await this.click(windowLocator);
    };

    async verifyWindowPageHeaders(windowHeader: string): Promise<void> {
        const windowHeaderLocator = `nb-card nb-card-header:has-text("${windowHeader}")`;

        const isVisible = await this.isVisible(windowHeaderLocator);
        expect(isVisible).toBeTruthy();
    };

    async verifyWindowContent(windowName: string, header: string, body?: string): Promise<void> {
        const windowHeaderLocator = `nb-window nb-card-header`;

        this.openWindow(windowName);
        const headerText = await this.getText(windowHeaderLocator);
        expect(headerText).toBe(header);

        if (body) {
            const bodyText = await this.getText(this.WINDOW_BODY_LOCATOR);
            expect(bodyText).toBe(body);
        };
    };

    async closeWindowWithEsc(windowName: string, closeWithEsc: boolean): Promise<void> {
        this.openWindow(windowName);

        await this.waitForVisible(this.WINDOW_BODY_LOCATOR);
        await this.mouseAndKeyboardInteraction.pressKeyboardKey("Escape");
        const isWindowBodyVissible = await this.isVisible(this.WINDOW_BODY_LOCATOR);
        console.log(isWindowBodyVissible, closeWithEsc);

            if (closeWithEsc) {
                expect(isWindowBodyVissible).toBeFalsy();
            } else {
                expect(isWindowBodyVissible).toBeTruthy();
            };
    };

    async closeWindowWithBackdrop(windowName: string, closeWithEsc: boolean): Promise<void> {
        this.openWindow(windowName);

        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.WINDOW_BODY_LOCATOR, -500, 0);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const isWindowBoodyVissible = await this.isVisible(this.WINDOW_BODY_LOCATOR);

        if (closeWithEsc) {
            expect(isWindowBoodyVissible).toBeFalsy();
        } else {
            expect(isWindowBoodyVissible).toBeTruthy();
        };
    };

    async minimizeWindowButtonFunctionality(windowName: string): Promise<void> {
        this.openWindow(windowName);

        const minimizeButtonLocator = `nb-window button nb-icon[icon="minus-outline"]`;

        await this.click(minimizeButtonLocator);
        const isWindowBoodyVissibleAfterMinimizing = (await this.attributes.getAttribute(`nb-window`, "class")).includes("minimized");
        await this.click(minimizeButtonLocator);
        const isWindowBoodyVissibleAfterMaximizing = (await this.attributes.getAttribute(`nb-window`, "class")).includes("full-screen");
        expect(isWindowBoodyVissibleAfterMinimizing).toBeTruthy();
        expect(isWindowBoodyVissibleAfterMaximizing).toBeTruthy();
    };

    async colapseWindowButtonFunctionality(windowName: string, collapseStatus: string, expandStatus: string): Promise<void> {
        this.openWindow(windowName);

        const collapseButtonLocator = `nb-window button nb-icon[icon="collapse-outline"]`;
        const expendButtonLocator = `nb-window button nb-icon[icon="expand-outline"]`;
        const windowsStatusLocator = `nb-window button:nth-child(2) nb-icon`;
        
        await this.click(collapseButtonLocator);
        const WindowsStatusAfterClickingCollapse = await this.attributes.getAttribute(windowsStatusLocator, "icon");
        await this.click(expendButtonLocator);
        const WindowsStatusAfterClickingExpand = await this.attributes.getAttribute(windowsStatusLocator, "icon");
        expect(WindowsStatusAfterClickingCollapse).toBe(collapseStatus);
        expect(WindowsStatusAfterClickingExpand).toBe(expandStatus);
    };

    async closeWindowWithCloseButton(windowName: string): Promise<void> {
        const closeButtonLocator = `nb-window button nb-icon[icon="close-outline"]`;
        
        this.openWindow(windowName);
        await this.click(closeButtonLocator);
        const isWindowBoodyVissible = await this.isVisible(this.WINDOW_BODY_LOCATOR);
        expect(isWindowBoodyVissible).toBeFalsy();
    };

    async isOpenWindowformTextBoxesActive(windowName: string, textboxName: string, activeStatus: string): Promise<void> {
        const TextboxLocator = `nb-window #${textboxName}`;

        this.openWindow(windowName);
        await this.click(TextboxLocator);
        const textboxStatus = await this.attributes.getAttribute(TextboxLocator, "class");
        expect(textboxStatus.includes(activeStatus)).toBeTruthy();
    };
};