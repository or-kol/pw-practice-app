import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class TrafficConsumption extends BasePage{

    constructor(page: Page){
        super(page);
    };


    async trafficConsumptionTimeSpan(expectedTimeSpan: string): Promise<void> {
        const consumptionPeriodDropdownSelector = `ngx-traffic nb-card-header:has-text("Traffic Consumption") nb-select`;
        const periodSelectionSelector = `nb-option-list nb-option:has-text("${expectedTimeSpan}")`;
        await this.click(consumptionPeriodDropdownSelector);
        await this.click(periodSelectionSelector);
        const selectedPeriod = await this.getText(consumptionPeriodDropdownSelector);
        expect(selectedPeriod).toContain(expectedTimeSpan);
    };
};