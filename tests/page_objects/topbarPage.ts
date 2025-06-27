import { Page } from "@playwright/test";
import { BasePage } from "./basePage";


export class TopbarPage extends BasePage {
    
    constructor(page: Page){
        super(page);
    }
    /*
    async SidebarMenuToggle(expectedStatus: string): Promise<boolean> {
        const sideBarLocator = "a[class=sidebar-toggle]";
        
        let sidebarClass = await this.getAttribute("nb-sidebar", "class");
        
        while (!sidebarClass.includes(expectedStatus)) {
            if (expectedStatus === "compacted" && !sidebarClass.includes("compacted")) {
                await this.click(sideBarLocator);
                sidebarClass = await this.getAttribute("nb-sidebar", "class");
            }
            else if (expectedStatus === "expanded" && !sidebarClass.includes("expanded")) {
                await this.click(sideBarLocator);
                sidebarClass = await this.getAttribute("nb-sidebar", "class");
            }
        }

        return sidebarClass.includes(expectedStatus);
    }
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

}