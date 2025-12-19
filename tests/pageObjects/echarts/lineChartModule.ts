import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class LineChartModule extends BasePage{

    readonly LINE_CHART_SELECTOR = 'ngx-echarts-line';
    private readonly COLOR_TOLERANCE = 30;

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, this.HALF_SEC);
    };


    async validateLineChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<void> {
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.LINE_CHART_SELECTOR}`, 'line-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, expectedColors);
        expect(result).toBeTruthy();
    };

    async lineLegendButtonFunctionality(x: number, y: number, missingLineColor: {r: number, g: number, b: number}[]): Promise<void> {
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(`${this.LINE_CHART_SELECTOR}`, x, y);
        await this.mouseAndKeyboardInteraction.mouseClick();
        const screenshotPath = await this.visualTesting.takeElementScreenshot(`${this.LINE_CHART_SELECTOR}`, 'line-chart-colors');
        const extractedColors = await this.visualTesting.extractColorsFromImage(screenshotPath);
        const result = this.visualTesting.compareColorsToExpected(extractedColors, missingLineColor, this.COLOR_TOLERANCE);
        expect(result).toBeFalsy();
    };

    async lineChartContentValidation(x: number, y: number, value: string): Promise<void> {
        await this.attributes.scrollIntoView(this.LINE_CHART_SELECTOR);
        await this.mouseAndKeyboardInteraction.moveMouseInBoxedElement(this.LINE_CHART_SELECTOR, x, y);
        const lineContent = await this.getText(this.LINE_CHART_SELECTOR);
        console.log(lineContent);
        expect(lineContent).toContain(value);
    };

    
};
