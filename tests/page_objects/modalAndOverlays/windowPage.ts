import { Page } from "@playwright/test";
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

    async openWindow(windowName: string): Promise<void> {
        const windowLocator = `nb-card button:has-text("${windowName}")`;
        await this.click(windowLocator);
    };



    async verifyWindowPageHeaders(windowHeader: string): Promise<boolean> {
        const windowHeaderLocator = `nb-card nb-card-header:has-text("${windowHeader}")`;
        return this.isVisible(windowHeaderLocator);
    };


    async verifyWindowContent(windowName: string, header: string, body?: string): Promise<boolean> {
        const windowHeaderLocator = `nb-window nb-card-header`;//`nb-windows-container nb-window nb-card nb-card-header`;
        let bodyText: string;

        this.openWindow(windowName);
        const headerText = await this.getText(windowHeaderLocator);

        if (body) {
            bodyText = await this.getText(this.WINDOW_BODY_LOCATOR);
        }

        return headerText === header || (headerText === header && bodyText === body);
    };


    async closeWindowWithEsc(windowName: string, closeWithEsc: boolean): Promise<boolean> {
        this.openWindow(windowName);
        await this.waitForVisible(this.WINDOW_BODY_LOCATOR);
        await this.pressKeyboardKey("Escape");
        const isWindowBodyVissible = await this.isVisible(this.WINDOW_BODY_LOCATOR);
        console.log(isWindowBodyVissible, closeWithEsc);

        return closeWithEsc? !isWindowBodyVissible : isWindowBodyVissible;
    };

    async closeWindowWithBackdrop(windowName: string, closeWithEsc: boolean): Promise<boolean> {
        this.openWindow(windowName);

        await this.moveMouseInBoxedElement(this.WINDOW_BODY_LOCATOR, -500, 0);
        await this.page.mouse.down();
        await this.page.mouse.up();

        const isWindowBoodyVissible = await this.isVisible(this.WINDOW_BODY_LOCATOR);

        return !isWindowBoodyVissible == closeWithEsc;
    };

    async minimizeWindowButtonFunctionality(windowName: string): Promise<boolean> {
        this.openWindow(windowName);
        const minimizeButtonLocator = `nb-window button nb-icon[icon="minus-outline"]`;

        await this.click(minimizeButtonLocator);
        const isWindowBoodyVissibleAfterMinimizing = (await this.getAttribute(`nb-window`, "class")).includes("minimized");

        await this.click(minimizeButtonLocator);
        const isWindowBoodyVissibleAfterMaximizing = (await this.getAttribute(`nb-window`, "class")).includes("full-screen");
        
        return isWindowBoodyVissibleAfterMinimizing && isWindowBoodyVissibleAfterMaximizing;
    };


    async colapseWindowButtonFunctionality(windowName: string, collapseStatus: string, expandStatus: string): Promise<boolean> {
        this.openWindow(windowName);
        const collapseButtonLocator = `nb-window button nb-icon[icon="collapse-outline"]`;
        const expendButtonLocator = `nb-window button nb-icon[icon="expand-outline"]`;
        const windowsStatusLocator = `nb-window button:nth-child(2) nb-icon`;
        
        await this.click(collapseButtonLocator);
        const WindowsStatusAfterClickingCollapse = await this.getAttribute(windowsStatusLocator, "icon");

        await this.click(expendButtonLocator);
        const WindowsStatusAfterClickingExpand = await this.getAttribute(windowsStatusLocator, "icon");

        return WindowsStatusAfterClickingCollapse === collapseStatus && WindowsStatusAfterClickingExpand === expandStatus;
    };


    async closeWindowWithCloseButton(windowName: string): Promise<boolean> {
        const closeButtonLocator = `nb-window button nb-icon[icon="close-outline"]`;
        this.openWindow(windowName);
        
        await this.click(closeButtonLocator);
        const isWindowBoodyVissible = await this.isVisible(this.WINDOW_BODY_LOCATOR);

        return !isWindowBoodyVissible;
    };


    async isOpenWindowformTextBoxesActive(windowName: string, textboxName: string, activeStatus: string): Promise<boolean> {
        const TextboxLocator = `nb-window #${textboxName}`;
        this.openWindow(windowName);

        await this.click(TextboxLocator);
        const textboxStatus = await this. getAttribute(TextboxLocator, "class");

        return textboxStatus.includes(activeStatus);
    }

}