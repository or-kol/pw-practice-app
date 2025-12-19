import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class TopBarPage extends BasePage {
    
    constructor(page: Page){
        super(page);
    };


    async SidebarMenuToggle(expectedStatus: string): Promise<void> {
        const sideBarToggleSelector = "a.sidebar-toggle";
        const sidebarSelector = "nb-sidebar";
        const maxTries = 5;
        let attempt = 0;
        let found = false;

        while (attempt < maxTries) {
            const sidebarClass = await this.attributes.getAttribute(sidebarSelector, "class");

            if (sidebarClass?.includes(expectedStatus)) {
                found = true;
                break;
            };

            await this.click(sideBarToggleSelector);
            attempt++;
        };

        expect(found).toBe(true);
    };

    async changeWebsiteThemeColor (color: string, expectedColor?: string): Promise<void> {
        const themeDropdownSelector = "ngx-header nb-select";
        const colorSelectionSelector = `nb-option-list nb-option:has-text("${color}")`;
        const headerLayoutSelector = "nb-layout-header";
        await this.click(themeDropdownSelector);
        await this.click(colorSelectionSelector);
        const actualColor = await this.attributes.getElementCssProperty(headerLayoutSelector, "background-color");
        if (expectedColor) {
            expect(actualColor).toEqual(expectedColor);
        };
    };

    async searchbarFunctionality(searchText: string): Promise<void> {
        const searchButtonSelector = "nb-search button";
        const searchBarSelector = "input.search-input";
        const searchBarFormSelector = "nb-search-field form";

        await this.click(searchButtonSelector);
        await this.fillInput(searchBarSelector, searchText);
        await this.mouseAndKeyboardInteraction.pressKeyboardKey("Enter");

        const formClass = await this.attributes.getAttribute(searchBarFormSelector, "class");
        expect(formClass).toContain("submitted");
    };
    
    async mailboxIcon(): Promise<void> {
        const mailboxIconSelector = "nb-action[icon='email-outline']";
        const visible = await this.isVisible(mailboxIconSelector);
        expect(visible).toBe(true);
    };

    async notificationsIcon(): Promise<void> {
        const notificationsIconSelector = "nb-action[icon='bell-outline']";
        const visible = await this.isVisible(notificationsIconSelector);
        expect(visible).toBe(true);
    };

    async userProfile(): Promise<void> {
        const userProfileButtonSelector = "nb-layout-header nb-user.context-menu-host";
        const userProfileSelector = "nb-menu:has-text('Profile')";

        await this.click(userProfileButtonSelector);
        const visible = await this.isVisible(userProfileSelector);
        expect(visible).toBe(true);
    };

    async userLogOut(): Promise<void> {
        const userProfileButtonSelector = "nb-layout-header nb-user.context-menu-host";
        const userProfileSelector = "nb-menu:has-text('Log out')";

        await this.click(userProfileButtonSelector);
        const visible = await this.isVisible(userProfileSelector);
        expect(visible).toBe(true);
    };
};