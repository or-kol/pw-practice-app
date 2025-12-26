import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class BarChartModule extends BasePage{

    readonly BAR_CHART_SELECTOR = 'ngx-echarts-bar';
    private readonly COLOR_TOLERANCE = 50;

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`);
        await this.waitForVisible(this.BAR_CHART_SELECTOR);
    };


    async validateBarChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.BAR_CHART_SELECTOR}`, 'bar-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors, this.COLOR_TOLERANCE);
        expect(result).toBeTruthy();
    };

    async barChartContentValidation(country: string, x: number, y: number, value: number): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.BAR_CHART_SELECTOR, x, y);
        const barContent = await this.getText(this.BAR_CHART_SELECTOR);
        expect(barContent).toContain(country);
        expect(barContent).toContain(value.toString());
    };
};
