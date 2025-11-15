import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const barAnimationChartData = require(`${TEST_PATHS.TEST_DATA}/echarts/barAnimationChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.barChartModule.goToEchartsPage();
});

test(`Bar animation chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = barAnimationChartData.bars.map((segment: any) => segment.color);
    handleXfail(testInfo, specFile);
    await pageManager.barAnimationChartModule.validateBarAnimationChartColors(expectedColors);
});

test.describe(`Multiple Bar Animation chart legend buttons validation test suite`, () => {
    const barAnimationChartLegendCoordinates = barAnimationChartData.bars;
    barAnimationChartLegendCoordinates.forEach(({barName, legendCoordinates, color}) => {
        test(`Legend button: ${barName} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.barAnimationChartModule.barAnimationChartLegendButtonFunctionality(legendCoordinates.x, legendCoordinates.y, [color]);
        });
    });
});

