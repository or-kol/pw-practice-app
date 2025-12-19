import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class WindowPage extends BasePage{

    private readonly WINDOW_BODY_SELECTOR = `nb-window nb-card-body`;
    private readonly WINDOW_ACTION_BUTTONS_SELECTOR = (icon: string) => `nb-window button nb-icon[icon="${icon}"]`;

    constructor(page: Page){
        super(page);
    };


    async goToWindowPage(): Promise<void> {
        await this.click(`a[title="Modal & Overlays"]`);
        await this.click(`a:has-text("Window")`, 500);
    };

    
    async verifyWindowPageHeaders(windowHeader: string): Promise<void> {
        const windowHeaderSelector = `nb-card nb-card-header:has-text("${windowHeader}")`;
        const isVisible = await this.isVisible(windowHeaderSelector);
        expect(isVisible).toBeTruthy();
    };

    async verifyWindowContent(windowName: string, header: string, body?: string): Promise<void> {
        const windowHeaderSelector = `nb-window nb-card-header`;
        this.openWindow(windowName);
        const headerText = await this.getText(windowHeaderSelector);
        expect(headerText).toBe(header);

        if (body) {
            const bodyText = await this.getText(this.WINDOW_BODY_SELECTOR);
            expect(bodyText).toBe(body);
        };
    };

    async closeWindowWithEsc(windowName: string, closeWithEsc: boolean): Promise<void> {
        this.openWindow(windowName);
        await this.waitForVisible(this.WINDOW_BODY_SELECTOR);
        await this.mouseAndKeyboardInteraction.pressKeyboardKey("Escape");
        const isWindowBodyVissible = await this.isVisible(this.WINDOW_BODY_SELECTOR);
        console.log(isWindowBodyVissible, closeWithEsc);

        if (closeWithEsc) {
            expect(isWindowBodyVissible).toBeFalsy();
        } else {
            expect(isWindowBodyVissible).toBeTruthy();
        };
    };

    async closeWindowWithBackdrop(windowName: string, closeWithEsc: boolean): Promise<void> {
        this.openWindow(windowName);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.WINDOW_BODY_SELECTOR, -500, 0);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const isWindowBoodyVissible = await this.isVisible(this.WINDOW_BODY_SELECTOR);

        if (closeWithEsc) {
            expect(isWindowBoodyVissible).toBeFalsy();
        } else {
            expect(isWindowBoodyVissible).toBeTruthy();
        };
    };

    async minimizeWindowButtonFunctionality(windowName: string): Promise<void> {
        this.openWindow(windowName);
        const minimizeButtonSelector = this.WINDOW_ACTION_BUTTONS_SELECTOR("minus-outline");
        await this.click(minimizeButtonSelector);
        const isWindowBoodyVissibleAfterMinimizing = (await this.attributes.getAttribute(`nb-window`, "class")).includes("minimized");
        await this.click(minimizeButtonSelector);
        const isWindowBoodyVissibleAfterMaximizing = (await this.attributes.getAttribute(`nb-window`, "class")).includes("full-screen");
        expect(isWindowBoodyVissibleAfterMinimizing).toBeTruthy();
        expect(isWindowBoodyVissibleAfterMaximizing).toBeTruthy();
    };

    async colapseWindowButtonFunctionality(windowName: string, collapseStatus: string, expandStatus: string): Promise<void> {
        this.openWindow(windowName);
        const windowsStatusSelector = `nb-window button:nth-child(2) nb-icon`;
        await this.click(this.WINDOW_ACTION_BUTTONS_SELECTOR("collapse-outline"));
        const WindowsStatusAfterClickingCollapse = await this.attributes.getAttribute(windowsStatusSelector, "icon");
        await this.click(this.WINDOW_ACTION_BUTTONS_SELECTOR("expand-outline"));
        const WindowsStatusAfterClickingExpand = await this.attributes.getAttribute(windowsStatusSelector, "icon");
        expect(WindowsStatusAfterClickingCollapse).toBe(collapseStatus);
        expect(WindowsStatusAfterClickingExpand).toBe(expandStatus);
    };

    async closeWindowWithCloseButton(windowName: string): Promise<void> {
        this.openWindow(windowName);
        await this.click(this.WINDOW_ACTION_BUTTONS_SELECTOR("close-outline"));
        const isWindowBoodyVissible = await this.isVisible(this.WINDOW_BODY_SELECTOR);
        expect(isWindowBoodyVissible).toBeFalsy();
    };

    async isOpenWindowformTextBoxesActive(windowName: string, textboxName: string, activeStatus: string): Promise<void> {
        const TextboxSelector = `nb-window #${textboxName}`;
        this.openWindow(windowName);
        await this.click(TextboxSelector);
        const textboxStatus = await this.attributes.getAttribute(TextboxSelector, "class");
        expect(textboxStatus.includes(activeStatus)).toBeTruthy();
    };


    private async openWindow(windowName: string): Promise<void> {
        const windowSelector = `nb-card button:has-text("${windowName}")`;
        await this.click(windowSelector);
    };
};