import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class PieChartModule extends BasePage{

    readonly PIE_CHART_LOCATOR = 'ngx-echarts-pie';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };
    

    async validatePieChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.PIE_CHART_LOCATOR}`, 'pie-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath!);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors, 50);
        expect(result).toBeTruthy();
    };
    
    async countryButtonFunctionality(x: number, y: number, screenshotName: string, countryName: string): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.PIE_CHART_LOCATOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.PIE_CHART_LOCATOR}`, screenshotName);
        const extractedText = await this.visualTesting.extractTextFromImage(screenshotPath!);
        const countryDisappeared = extractedText.toLowerCase().includes(countryName.toLowerCase());
        expect(countryDisappeared).toBeFalsy();
    };

    async pieChartContentValidation(country: string, x: number, y: number, value: number, percentage: string): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.PIE_CHART_LOCATOR}`, x, y);
        const countryData = await this.getText(this.PIE_CHART_LOCATOR);
        expect(countryData).toContain(country);
        expect(countryData).toContain(value.toString());
        expect(countryData).toContain(percentage);
    };
};
