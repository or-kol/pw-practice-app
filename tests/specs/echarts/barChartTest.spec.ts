import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const barChartData = require(`${TEST_PATHS.TEST_DATA}/echarts/barChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.barChartModule.goToEchartsPage();
});


test(`Bar chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = [barChartData.barChart.barsColor];
    handleXfail(testInfo, specFile);
    await pageManager.barChartModule.validateBarChartColors(expectedColors);
});

test.describe(`Bar chart data validation test suite`, () => {
    const barsData = barChartData.barChart.barsData;
    barsData.forEach(({day, value, barCoordinates}) => {
        test(`Bar: ${day} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.barChartModule.barChartContentValidation(day, barCoordinates.x, barCoordinates.y, value);
        });
    });
});