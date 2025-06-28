import { Page } from "@playwright/test";
import { BasePage } from "./basePage";


export class TopbarPage extends BasePage {
    
    constructor(page: Page){
        super(page);
    }


    /**
     * Toggles the sidebar menu to the specified state ("compacted" or "expanded").
     * It will attempt to toggle the sidebar up to 5 times to reach the expected state.
     * @param expectedStatus - The expected state of the sidebar ("compacted" or "expanded").
     * @returns A Promise that resolves to true if the sidebar reached the expected state, false otherwise.
     */
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


    /**
     * Changes the website theme color by selecting the specified color from the theme dropdown.
     * @param color - The name of the color to select (e.g., "Light", "Dark", "Cosmic", "Corporate").
     * @returns A Promise that resolves to the CSS background color of the header layout after applying the theme.
     */
    async changeWebsiteThemeColor (color: string) {
        const themeDropdown = "ngx-header nb-select";
        const colorSelection = `nb-option-list nb-option:has-text("${color}")`;
        const headerLayout = "nb-layout-header";
        await this.click(themeDropdown);
        await this.click(colorSelection);
        return await this.getElementCssProperty(headerLayout, "background-color");        
    }


    /**
     * Searches for the specified text in the search bar and checks if the search was submitted successfully.
     * @param searchText - The text to search for.
     * @returns A Promise that resolves to true if the search was submitted successfully, false otherwise.
     */
    async searchbarFunctionality(searchText: string): Promise<boolean> {
        const searchButton = "nb-search button";
        const searchBar = "input.search-input";
        const searchBarForm = "nb-search-field form";

        await this.click(searchButton);
        await this.fill(searchBar, searchText);
        await this.pressKeyboardKey("Enter");

        return (await this.getAttribute(searchBarForm, "class")).includes("submitted");
    }
    

    /**
     * Checks if the mailbox icon is visible in the top bar.
     * @returns A Promise that resolves to true if the mailbox icon is visible, false otherwise.
     */
    async mailboxIcon(): Promise<boolean> {
        const mailboxIcon = "nb-action[icon='email-outline']";
        return await this.isVisible(mailboxIcon);
    }

    
    /**
     * Checks if the notifications icon is visible in the top bar.
     * @returns A Promise that resolves to true if the notifications icon is visible, false otherwise.
     */
    async notificationsIcon(): Promise<boolean> {
        const notificationsIcon = "nb-action[icon='bell-outline']";
        return await this.isVisible(notificationsIcon);
    }

}