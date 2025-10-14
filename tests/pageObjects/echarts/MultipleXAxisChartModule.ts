import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MultipleXAxisChartModule extends BasePage{

    readonly MULTIPLE_XAXIS_CHART_LOCATOR = 'ngx-echarts-multiple-xaxis';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };


    async validateMultipleXAxisChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.MULTIPLE_XAXIS_CHART_LOCATOR}`, 'multiple-X-axis-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath!);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors);
        console.log(extractedColors);
        expect(result).toBeTruthy();
    };

    async multipleXAxisChartContentValidation(x: number, y: number, value2015: string, value2016: string): Promise<void> {
        await this.attributes.scrollIntoView(this.MULTIPLE_XAXIS_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.MULTIPLE_XAXIS_CHART_LOCATOR, x, y);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.MULTIPLE_XAXIS_CHART_LOCATOR}`, 'multiple-X-axis-chart-colors');
        const lineContent = await this.visualTesting.extractTextFromImage(screenshotPath);
        console.log(lineContent);
        expect(lineContent).toContain(value2015);
        expect(lineContent).toContain(value2016);
    };
};
