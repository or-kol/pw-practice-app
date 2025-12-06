import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class TopBarPage extends BasePage {
    
    constructor(page: Page){
        super(page);
    };


    async SidebarMenuToggle(expectedStatus: string): Promise<void> {
        const sideBarToggle = "a.sidebar-toggle";
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

            await this.click(sideBarToggle);
            attempt++;
        };

        expect(found).toBe(true);
    };

    async changeWebsiteThemeColor (color: string, expectedColor?: string): Promise<void> {
        const themeDropdown = "ngx-header nb-select";
        const colorSelection = `nb-option-list nb-option:has-text("${color}")`;
        const headerLayout = "nb-layout-header";
        await this.click(themeDropdown);
        await this.click(colorSelection);
        const actualColor = await this.attributes.getElementCssProperty(headerLayout, "background-color");
        if (expectedColor) {
            expect(actualColor).toEqual(expectedColor);
        };
    };

    async searchbarFunctionality(searchText: string): Promise<void> {
        const searchButton = "nb-search button";
        const searchBar = "input.search-input";
        const searchBarForm = "nb-search-field form";

        await this.click(searchButton);
        await this.fillInput(searchBar, searchText);
        await this.mouseAndKeyboardInteraction.pressKeyboardKey("Enter");

        const formClass = await this.attributes.getAttribute(searchBarForm, "class");
        expect(formClass).toContain("submitted");
    };
    
    async mailboxIcon(): Promise<void> {
        const mailboxIcon = "nb-action[icon='email-outline']";
        const visible = await this.isVisible(mailboxIcon);
        expect(visible).toBe(true);
    };

    async notificationsIcon(): Promise<void> {
        const notificationsIcon = "nb-action[icon='bell-outline']";
        const visible = await this.isVisible(notificationsIcon);
        expect(visible).toBe(true);
    };

    async userProfile(): Promise<void> {
        const userProfileButton = "nb-layout-header nb-user.context-menu-host";
        const userProfile = "nb-menu:has-text('Profile')";

        await this.click(userProfileButton);
        const visible = await this.isVisible(userProfile);
        expect(visible).toBe(true);
    };

    async userLogOut(): Promise<void> {
        const userProfileButton = "nb-layout-header nb-user.context-menu-host";
        const userProfile = "nb-menu:has-text('Log out')";

        await this.click(userProfileButton);
        const visible = await this.isVisible(userProfile);
        expect(visible).toBe(true);
    };
};