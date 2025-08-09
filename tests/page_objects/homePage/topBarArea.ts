import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class TopBarPage extends BasePage {
    
    constructor(page: Page){
        super(page);
    }


    async SidebarMenuToggle(expectedStatus: "compacted" | "expanded"): Promise<boolean> {
        const sideBarToggle = "a.sidebar-toggle";
        const sidebarSelector = "nb-sidebar";

        const maxTries = 5;
        let attempt = 0;

        while (attempt < maxTries) {
            const sidebarClass = await this.getAttribute(sidebarSelector, "class");

            if (sidebarClass?.includes(expectedStatus)) {
                return true;
            }

            await this.click(sideBarToggle);
            attempt++;
        }

        console.warn(`Sidebar did not reach "${expectedStatus}" state after ${maxTries} attempts.`);
        return false;
    }

    async changeWebsiteThemeColor (color: string) {
        const themeDropdown = "ngx-header nb-select";
        const colorSelection = `nb-option-list nb-option:has-text("${color}")`;
        const headerLayout = "nb-layout-header";
        await this.click(themeDropdown);
        await this.click(colorSelection);
        return await this.getElementCssProperty(headerLayout, "background-color");        
    }

    async searchbarFunctionality(searchText: string): Promise<boolean> {
        const searchButton = "nb-search button";
        const searchBar = "input.search-input";
        const searchBarForm = "nb-search-field form";

        await this.click(searchButton);
        await this.fill(searchBar, searchText);
        await this.pressKeyboardKey("Enter");

        return (await this.getAttribute(searchBarForm, "class")).includes("submitted");
    }
    

    async mailboxIcon(): Promise<boolean> {
        const mailboxIcon = "nb-action[icon='email-outline']";
        return await this.isVisible(mailboxIcon);
    }

    async notificationsIcon(): Promise<boolean> {
        const notificationsIcon = "nb-action[icon='bell-outline']";
        return await this.isVisible(notificationsIcon);
    }


    async userProfile(): Promise<boolean> {
        const userProfileButton = "nb-layout-header nb-user.context-menu-host";
        const userProfile = "nb-menu:has-text('Profile')";

        await this.click(userProfileButton);
        return await this.isVisible(userProfile);
    }

    async userLogOut(): Promise<boolean> {
        const userProfileButton = "nb-layout-header nb-user.context-menu-host";
        const userProfile = "nb-menu:has-text('Log out')";

        await this.click(userProfileButton);
        return await this.isVisible(userProfile);
    }
}