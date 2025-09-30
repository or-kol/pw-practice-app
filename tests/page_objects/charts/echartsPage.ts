import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { TEST_PATHS } from "../../config/test-config";

export class EchartsPage extends BasePage{

    readonly PIE_CHART_LOCATOR = 'ngx-echarts-pie';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };
    

    async validatePieChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<boolean> {
        await this.takeElementScreenshot(`${this.PIE_CHART_LOCATOR} canvas`, 'pie-chart-colors');
        const screenshotPath = `${TEST_PATHS.SCREENSHOTS}/pie-chart-colors.png`;
        return await this.extractAndCompareColorsFromImage(screenshotPath, expectedColors, 50);
    };
    /*
    async countryButtonFunctionality(x: number, y: number, screenshotName: string, countryName: string): Promise<boolean> {
        await this.moveMouseInBoxedElement(`${this.PIE_CHART_LOCATOR} canvas`, x, y, true);
        await this.page.waitForTimeout(500);
        await this.takeElementScreenshot(`${this.PIE_CHART_LOCATOR} canvas`, screenshotName);
        
        // Extract text from screenshot using OCR
        const screenshotPath = `${TEST_PATHS.SCREENSHOTS}/${screenshotName}.png`;
        const extractedText = await this.extractTextFromImage(screenshotPath);
        
        // Check if country name is NOT found in the extracted text (meaning it disappeared)
        const countryDisappeared = !extractedText.toLowerCase().includes(countryName.toLowerCase());
        console.log(extractedText);
        
        return countryDisappeared;
    }
    */
};



