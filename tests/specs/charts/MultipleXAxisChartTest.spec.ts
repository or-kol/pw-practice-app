import { test, TEST_PATHS, handleXfail } from "../../utils";
import { PageManager } from "../../pageObjects/pageManager";
import path from "path";

const multipleXAxisChartData = require(`${TEST_PATHS.TEST_DATA}/charts/multipleXAxisChartData.json`);
let pageManager: PageManager;
const specFile = path.basename(__filename, ".spec.ts");

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.barChartModule.goToEchartsPage();
});

test(`Multiple X-Axis chart colors validation test`, async ({}, testInfo) => {
    const expectedColors = multipleXAxisChartData.lines.map(line => line.color);
    handleXfail(testInfo, specFile);
    await pageManager.multipleXAxisChartModule.validateMultipleXAxisChartColors(expectedColors);
});

test.describe(`Multiple X-Axis chart legend buttons validation test suite`, () => {
    const linesLegendCoordinates = multipleXAxisChartData.lines;
    linesLegendCoordinates.forEach(({lineName, legendCoordinates, color}) => {
        test(`Legend button: ${lineName} validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.multipleXAxisChartModule.yearLegendButtonFunctionality(legendCoordinates.x, legendCoordinates.y, [color]);
        });
    });
});

test.describe(`Multiple X-Axis chart data validation test suite`, () => {
    const chartPoints = multipleXAxisChartData.points;
    chartPoints.forEach(({ month, x, y, value2015, value2016 }) => {
        test(`${month} point data validation test`, async ({}, testInfo) => {
            handleXfail(testInfo, specFile);
            await pageManager.multipleXAxisChartModule.multipleXAxisChartContentValidation(x, y, value2015, value2016);
        });
    });
});
