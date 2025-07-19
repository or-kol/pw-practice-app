import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class ManagementConsoleModul extends BasePage{
    
    constructor(page: Page){
        super(page)
    }


    async electricityConsumptionGraphResponsivnes(offsetX: number, offsetY: number, expectedKwh: string): Promise<boolean>{
        const electricityConsumptionGraphLocator = `ngx-electricity-chart`;
        const graphKwhValue = `ngx-electricity-chart >> text=/\\d+\\s*kWh/`;
        await this.moveMouseInBoxedElement(electricityConsumptionGraphLocator, offsetX, offsetY);
        const actualKwh = await this.getText(graphKwhValue);
        return actualKwh === expectedKwh;
    }


    async electricityConsumptionSwitchYears (expectedYear: string): Promise<boolean>{
        const yearLocator = `ngx-electricity >> text=${expectedYear}`;
        await this.click(yearLocator);
        const validationLocator = `ngx-electricity [class="tab ng-star-inserted active"]`;
        const actualYear = await this.page.textContent(validationLocator);
        return actualYear === expectedYear
    }
}