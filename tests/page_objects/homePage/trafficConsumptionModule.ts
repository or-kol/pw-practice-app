import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";


export class TrafficConsumption extends BasePage{

    constructor(page: Page){
        super(page);
    };

    async traficConsumptionPeriod(expectedTimePeriod: string): Promise<void> {
        const consumptionPeriodDropdown = `ngx-traffic nb-card-header:has-text("Traffic Consumption") nb-select`;
        const periodSelection = `nb-option-list nb-option:has-text("${expectedTimePeriod}")`;

        await this.click(consumptionPeriodDropdown);
        await this.click(periodSelection);
        const selectedPeriod = await this.getText(consumptionPeriodDropdown);
        
        expect(selectedPeriod).toContain(expectedTimePeriod);
    };
};