import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class ManagementConsoleModule extends BasePage{
    
    constructor(page: Page){
        super(page);
    };


    async electricityConsumptionGraphResponsiveness(offsetX: number, offsetY: number, expectedKwh: string): Promise<void>{
        const electricityConsumptionGraphLocator = `ngx-electricity-chart`;
        const graphKwhValue = `ngx-electricity-chart >> text=/\\d+\\s*kWh/`;

        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(electricityConsumptionGraphLocator, offsetX, offsetY);
        const actualKwh = await this.getText(graphKwhValue);
        expect(actualKwh).toBe(expectedKwh);
    };

    async electricityConsumptionSwitchYears (expectedYear: string): Promise<void>{
        const yearLocator = `ngx-electricity >> text=${expectedYear}`;

        await this.click(yearLocator);
        const validationLocator = `ngx-electricity [class="tab ng-star-inserted active"]`;
        const actualYear = await this.getText(validationLocator);
        expect(actualYear).toBe(expectedYear);
    };

    async changeGraphTimePeriod(expectedPeriod: string, initialPeriod = "week"): Promise<void>{
        const initialTimePeriodButtonLocator = `ngx-electricity nb-select >> text="${initialPeriod}"`;
        const timePeriodOptionsLocator = `nb-option >> text=${expectedPeriod}`;

        await this.click(initialTimePeriodButtonLocator);
        await this.click(timePeriodOptionsLocator);
        const finalTimePeriodButtonLocator = `ngx-electricity nb-select >> text="${expectedPeriod}"`;
        await this.click(finalTimePeriodButtonLocator);
        const selectedPeriodClass = await this.attributes.getAttribute(timePeriodOptionsLocator, "class");
        expect(selectedPeriodClass).toContain("selected");
    };
};