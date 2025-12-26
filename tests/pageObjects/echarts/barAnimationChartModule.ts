import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class BarAnimationChartModule extends BasePage{

    readonly BAR_ANIMATION_CHART_SELECTOR = 'ngx-echarts-bar-animation';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`);
        await this.waitForVisible(this.BAR_ANIMATION_CHART_SELECTOR);
    };

    async validateBarAnimationChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.BAR_ANIMATION_CHART_SELECTOR);
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.BAR_ANIMATION_CHART_SELECTOR}`, 'bar-animation-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors);
        expect(result).toBeTruthy();
    };

    async barAnimationChartLegendButtonFunctionality(x: number, y: number, missingBarColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.attributes.scrollIntoView(this.BAR_ANIMATION_CHART_SELECTOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.BAR_ANIMATION_CHART_SELECTOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.BAR_ANIMATION_CHART_SELECTOR}`, 'bar-animation-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingBarColor);
        expect(result).toBeFalsy();
    };
};
