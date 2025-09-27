import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { TEST_PATHS } from "../../config/test-config";

export class EchartsPage extends BasePage{

    readonly chartContainer = '#echarts';
    readonly chartCanvas = 'canvas';
    readonly pieChartTab = 'ngx-echarts-pie';
    readonly chartLegend = '.echarts-legend';

    constructor(page: Page){
        super(page);
    };

    async goToEchartsPage(): Promise<void> {
        await this.click(`a[title="Charts"]`);
        await this.click(`a:has-text("Echarts")`, 500);
    };
    

    async validatePieChartColors(expectedColors: {r: number, g: number, b: number}[]): Promise<boolean> {
        await this.takeElementScreenshot(`${this.pieChartTab} canvas`, 'pie-chart-colors');
        const screenshotPath = `${TEST_PATHS.SCREENSHOTS}/pie-chart-colors.png`;
        return await this.extractAndCompareColorsFromImage(screenshotPath, expectedColors, 50);
    };
    
};



