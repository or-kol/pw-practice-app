import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class LineChartModule extends BasePage{

    readonly LINE_CHART_LOCATOR = 'ngx-echarts-line';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };


    async validateLineChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.LINE_CHART_LOCATOR}`, 'line-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath!);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors);
        expect(result).toBeTruthy();
    };

    async lineLegendButtonFunctionality(x: number, y: number, missingLineColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.LINE_CHART_LOCATOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.LINE_CHART_LOCATOR}`, 'line-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath!);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingLineColor, 30);
        expect(result).toBeFalsy();
    };

    async lineChartContentValidation(x: number, y: number, value: string): Promise<void> {
        await this.attributes.scrollIntoView(this.LINE_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.LINE_CHART_LOCATOR, x, y);
        const lineContent = await this.getText(this.LINE_CHART_LOCATOR);
        console.log(lineContent);
        expect(lineContent).toContain(value);
    };

    
};
