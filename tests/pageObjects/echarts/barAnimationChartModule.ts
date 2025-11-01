import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class BarAnimationChartModule extends BasePage{

    readonly BAR_ANIMATION_CHART_LOCATOR = 'ngx-echarts-bar-animation';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };

    async validateBarAnimationChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.BAR_ANIMATION_CHART_LOCATOR);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.BAR_ANIMATION_CHART_LOCATOR}`, 'bar-animation-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors);
        expect(result).toBeTruthy();
    };

    async barAnimationChartLegendButtonFunctionality(x: number, y: number, missingBarColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.BAR_ANIMATION_CHART_LOCATOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.BAR_ANIMATION_CHART_LOCATOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.BAR_ANIMATION_CHART_LOCATOR}`, 'bar-animation-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingBarColor);
        expect(result).toBeFalsy();
    };
};
