import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class AreaStackChartModule extends BasePage{

    readonly AREA_STACK_CHART_SELECTOR = 'ngx-echarts-area-stack';
    private readonly COLOR_TOLERANCE = 35;

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`);
        await this.waitForVisible(this.AREA_STACK_CHART_SELECTOR);
    };

    async validateAreaStackChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.AREA_STACK_CHART_SELECTOR);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.AREA_STACK_CHART_SELECTOR}`, 'area-stack-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors);
        expect(result).toBeTruthy();
    };

    async areaStackChartLegendButtonFunctionality(x: number, y: number, missingAreaColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.AREA_STACK_CHART_SELECTOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.AREA_STACK_CHART_SELECTOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.AREA_STACK_CHART_SELECTOR}`, 'area-stack-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingAreaColor, this.COLOR_TOLERANCE);
        expect(result).toBeFalsy();
    };

    async areaStackChartContentValidation(day: string, xAxis: number, yAxis: number, areaStack: string, value: string): Promise<void> {
        await this.attributes.scrollIntoView(this.AREA_STACK_CHART_SELECTOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.AREA_STACK_CHART_SELECTOR, xAxis, yAxis);
        const stackContent = await this.getText(this.AREA_STACK_CHART_SELECTOR);
        console.log("print:" + stackContent);
        expect(stackContent).toContain(day);
        expect(stackContent).toContain(`${areaStack}: ${value}`);
    };
};
