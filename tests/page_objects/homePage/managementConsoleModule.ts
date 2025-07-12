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
}