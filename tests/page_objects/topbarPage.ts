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
    async websiteThemeColor (color: string) {
        const themeDropdown = "ngx-header nb-select";
        const colorSelection = `nb-option-list nb-option:has-text("${color}")`;
        const headerLayout = "nb-layout-header";
        await this.click(themeDropdown);
        await this.click(colorSelection);
        return await this.getElementCssProperty(headerLayout, "background-color");        
    }

}