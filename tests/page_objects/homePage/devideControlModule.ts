import { BasePage } from "../basePage";
import { Page } from "@playwright/test";


export class DevideControlModule extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async controlerSwitch(controllerName: string, switchDesiredStatus: "ON" | "OFF", ): Promise<boolean> {
        const switchLocator = `ngx-status-card[ng-reflect-title='${controllerName}']`;
        const switchStatusLocator = `${switchLocator} div.status.paragraph-2`;

        const switchInitialStatus = await this.getText(switchStatusLocator);

        if (switchInitialStatus != switchDesiredStatus) {
            await this.click(switchLocator);
        }
        else {
            return true;
        }

        const switchCurrentstatus = await this.getText(switchStatusLocator);
        return switchCurrentstatus == switchDesiredStatus;
    }
}