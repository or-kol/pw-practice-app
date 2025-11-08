import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class RadarChartModule extends BasePage{

    readonly RADAR_CHART_LOCATOR = 'ngx-echarts-radar';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };
    

    async validateRadarChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.RADAR_CHART_LOCATOR);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.RADAR_CHART_LOCATOR}`, 'radar-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors, 50);
        expect(result).toBeTruthy();
    };
    
    async radarChartLegendButtonFunctionality(x: number, y: number, missingBarColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.RADAR_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.RADAR_CHART_LOCATOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.RADAR_CHART_LOCATOR}`, 'radar-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingBarColor);
        expect(result).toBeFalsy();
    };

    async radarChartContentValidation(category: string, x: number, y: number, value: number): Promise<void> {
        await this.attributes.scrollIntoView(this.RADAR_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.RADAR_CHART_LOCATOR}`, x, y);
        const pointData = await this.getText(this.RADAR_CHART_LOCATOR);
        expect(pointData).toContain(`${category} : ${value}`);
    };
};
