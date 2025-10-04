import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";


export class TrafficConsumption extends BasePage{

    constructor(page: Page){
        super(page);
    };

    async trafficConsumptionTimeSpan(expectedTimeSpan: string): Promise<void> {
        const consumptionPeriodDropdown = `ngx-traffic nb-card-header:has-text("Traffic Consumption") nb-select`;
        const periodSelection = `nb-option-list nb-option:has-text("${expectedTimeSpan}")`;

        await this.click(consumptionPeriodDropdown);
        await this.click(periodSelection);
        const selectedPeriod = await this.getText(consumptionPeriodDropdown);
        expect(selectedPeriod).toContain(expectedTimeSpan);
    };
};