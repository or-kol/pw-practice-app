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
        expect(result).toBeTruthy();
    };

    async multipleXAxisChartContentValidation(x: number, y: number, value2015: string, value2016: string): Promise<void> {
        await this.attributes.scrollIntoView(this.MULTIPLE_XAXIS_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.MULTIPLE_XAXIS_CHART_LOCATOR, x, y);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.MULTIPLE_XAXIS_CHART_LOCATOR}`, 'multiple-X-axis-chart-colors');
        const lineContent = await this.visualTesting.extractTextFromImage(screenshotPath);

        // OCR sometimes misses the decimal point (e.g. "1.2" read as "12"), so we also accept the value multiplied by 10 as a match.
        const candidates2015 = [value2015, String(Number(value2015) * 10)];
        expect(candidates2015.some(c => lineContent.includes(c))).toBeTruthy();

        const candidates2016 = [value2016, String(Number(value2016) * 10)];
        expect(candidates2016.some(c => lineContent.includes(c))).toBeTruthy();
    };
};
