import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class AreaStackChartModule extends BasePage{

    readonly AREA_STACK_CHART_LOCATOR = 'ngx-echarts-area-stack';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };

    async validateAreaStackChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.AREA_STACK_CHART_LOCATOR);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.AREA_STACK_CHART_LOCATOR}`, 'area-stack-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors);
        expect(result).toBeTruthy();
    };

    async AreaStackChartLegendButtonFunctionality(x: number, y: number, missingLineColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.AREA_STACK_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.AREA_STACK_CHART_LOCATOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.AREA_STACK_CHART_LOCATOR}`, 'area-stack-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingLineColor, 20);
        expect(result).toBeFalsy();
    };

    async areaStackChartContentValidation(day: string, xAxis: number, yAxis: number, areaStack: string, value: string): Promise<void> {
        await this.attributes.scrollIntoView(this.AREA_STACK_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.AREA_STACK_CHART_LOCATOR, xAxis, yAxis);
        const stackContent = await this.getText(this.AREA_STACK_CHART_LOCATOR);
        expect(stackContent).toContain(day);
        expect(stackContent).toContain(`${areaStack}: ${value}`);
    };
};
