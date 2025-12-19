import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class ManagementConsoleModule extends BasePage{
    
    constructor(page: Page){
        super(page);
    };


    async electricityConsumptionGraphResponsiveness(offsetX: number, offsetY: number, expectedKwh: string): Promise<void>{
        const electricityConsumptionGraphSelector = `ngx-electricity-chart`;
        const graphKwhValue = `ngx-electricity-chart >> text=/\\d+\\s*kWh/`;

        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(electricityConsumptionGraphSelector, offsetX, offsetY);
        const actualKwh = await this.getText(graphKwhValue);
        expect(actualKwh).toBe(expectedKwh);
    };

    async electricityConsumptionSwitchYears (expectedYear: string): Promise<void>{
        const yearSelector = `ngx-electricity >> text=${expectedYear}`;

        await this.click(yearSelector);
        const validationSelector = `ngx-electricity [class="tab ng-star-inserted active"]`;
        const actualYear = await this.getText(validationSelector);
        expect(actualYear).toBe(expectedYear);
    };

    async changeGraphTimePeriod(expectedPeriod: string, initialPeriod = "week"): Promise<void>{
        const initialTimePeriodButtonSelector = `ngx-electricity nb-select >> text="${initialPeriod}"`;
        const timePeriodOptionsSelector = `nb-option >> text=${expectedPeriod}`;

        await this.click(initialTimePeriodButtonSelector);
        await this.click(timePeriodOptionsSelector);
        const finalTimePeriodButtonSelector = `ngx-electricity nb-select >> text="${expectedPeriod}"`;
        await this.click(finalTimePeriodButtonSelector);
        const selectedPeriodClass = await this.attributes.getAttribute(timePeriodOptionsSelector, "class");
        expect(selectedPeriodClass).toContain("selected");
    };
};