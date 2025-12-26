import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class RadarChartModule extends BasePage{

    readonly RADAR_CHART_SELECTOR = 'ngx-echarts-radar';
    private readonly COLOR_TOLERANCE = 50;

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`);
        await this.waitForVisible(this.RADAR_CHART_SELECTOR);
    };
    

    async validateRadarChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.RADAR_CHART_SELECTOR);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.RADAR_CHART_SELECTOR}`, 'radar-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors, this.COLOR_TOLERANCE);
        expect(result).toBeTruthy();
    };
    
    async radarChartLegendButtonFunctionality(x: number, y: number, missingBarColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.RADAR_CHART_SELECTOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.RADAR_CHART_SELECTOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.RADAR_CHART_SELECTOR}`, 'radar-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingBarColor);
        expect(result).toBeFalsy();
    };

    async radarChartContentValidation(category: string, x: number, y: number, value: number): Promise<void> {
        await this.attributes.scrollIntoView(this.RADAR_CHART_SELECTOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.RADAR_CHART_SELECTOR}`, x, y);
        const pointData = await this.getText(this.RADAR_CHART_SELECTOR);
        expect(pointData).toContain(`${category} : ${value}`);
    };
};
