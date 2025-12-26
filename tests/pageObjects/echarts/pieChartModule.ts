import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class PieChartModule extends BasePage{

    readonly PIE_CHART_SELECTOR = 'ngx-echarts-pie';
    private readonly COLOR_TOLERANCE = 50;

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`);
        await this.waitForVisible(this.PIE_CHART_SELECTOR);
    };
    

    async validatePieChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.PIE_CHART_SELECTOR}`, 'pie-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors, this.COLOR_TOLERANCE);
        expect(result).toBeTruthy();
    };
    
    async countryLegendButtonFunctionality(x: number, y: number, screenshotName: string, countryName: string): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.PIE_CHART_SELECTOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.PIE_CHART_SELECTOR}`, screenshotName);
        const extractedText = await this.visualTesting.extractTextFromImage(screenshotPath);
        const countryDisappeared = extractedText.toLowerCase().includes(countryName.toLowerCase());
        expect(countryDisappeared).toBeFalsy();
    };

    async pieChartContentValidation(country: string, x: number, y: number, value: number, percentage: string): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.PIE_CHART_SELECTOR}`, x, y);
        const countryData = await this.getText(this.PIE_CHART_SELECTOR);
        expect(countryData).toContain(country);
        expect(countryData).toContain(value.toString());
        expect(countryData).toContain(percentage);
    };
};
